import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../model/user';

@Injectable()
export class UserListService {

    private userListRef = this.db.list<User>('user-list');

    constructor(private db: AngularFireDatabase) { }

    getNoteList() {
        return this.userListRef;
    }

    
    // getNoteListById(userId: string) {
    //     return this.db.;
    // }

    addNote(user: User) {
        return this.userListRef.push(user);
    }

    updateNote(user: User) {
        return this.userListRef.update(user.userid, user);
    }

    removeNote(user: User) {
        return this.userListRef.remove(user.userid);
    }
}