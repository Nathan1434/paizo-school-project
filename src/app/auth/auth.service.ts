import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, onSnapshot, doc, query, where } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { User } from './user';
import { Router } from '@angular/router';
import { Game } from '../games/game.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //////////////////////////////////////////////////////////////////////////

    // Your web app's Firebase configuration
    private firebaseConfig = {
        apiKey: "AIzaSyA1xchMsvWcW5E0zf2f-D_g6JJkbdxqUXQ",
        authDomain: "paizo-97c87.firebaseapp.com",
        databaseURL: "https://paizo-97c87-default-rtdb.firebaseio.com",
        projectId: "paizo-97c87",
        storageBucket: "paizo-97c87.appspot.com",
        messagingSenderId: "485760050339",
        appId: "1:485760050339:web:c51d261d6dff21749b8b16"
    };

    // Create firebase app
    private app = initializeApp(this.firebaseConfig);

    // Get services
    private db = getFirestore(this.app);
    private auth = getAuth(this.app);

    // Get database collections
    private userCollection = collection(this.db, 'users');

    // Store user state and information
    public user?: User;
    get currentUser() {
        return this.auth.currentUser;
    }
    get isLoggedIn(): boolean {
        return !!this.currentUser;
    }

    //////////////////////////////////////////////////////////////////////////

    constructor(private router: Router) { }

    //////////////////////////////////////////////////////////////////////////

    async updateUsersWishlist(game?: Game): Promise<void> {
        if (!this.user) {
            this.router.navigateByUrl('/login');
            return;
        }

        if (!game) return;

        // Add or remove game from user's wishlist
        let newWishlist: Game[] = !this.user.isInWishlist(game.id) ?
            [...this.user.wishlist, game] :
            this.user.wishlist.filter(i => i.id !== game.id);

        const userRef = doc(this.db, 'users', this.user.id!);
        await updateDoc(userRef, { wishlist: newWishlist });
    }

    async autoLogin(): Promise<void> {
        onAuthStateChanged(this.auth, async (user) => {
            if (!user) return;

            // Get user information from database
            const q = query(this.userCollection, where('uid', '==', this.currentUser!.uid));

            // Watch for changes to user information
            onSnapshot(q, (snapshot) => {
                if (!snapshot.empty)
                    this.user = new User(snapshot.docs[0].id, (snapshot.docs[0].data() as any));
            });
        });

    }

    // Create a user with the given credentials
    async signupUser(userData: { username: string, email: string, password: string }): Promise<void> {
        try {
            // Create user with email and password
            const res = await createUserWithEmailAndPassword(this.auth, userData.email, userData.password);

            // Add user to database
            const dbUser = {
                uid: res.user.uid,
                username: userData.username,
                email: res.user.email || userData.email,

                wishlist: [],
            };
            await addDoc(this.userCollection, dbUser);

            // Redirect user back to home page
            this.router.navigateByUrl('/');
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    // Log a user in with the given credentials
    async loginUser(credentials: { email: string, password: string }): Promise<void> {
        try {
            // Log user in
            await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);

            // Redirect user back to home page
            this.router.navigateByUrl('/');
        } catch (error) {
            this.handleAuthError(error);
        }
    }

    async logout(): Promise<void> {
        await signOut(this.auth);
        this.user = undefined;

        this.router.navigateByUrl('/');
    }


    private handleAuthError(error: any): void {
        if (error.code && error.message) {
            const { code } = error;

            throw new Error(code);
        };

        throw error;
    }
}
