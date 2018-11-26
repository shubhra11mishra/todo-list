import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  todoList: AngularFireList<any>;
  constructor(private firebaseDB: AngularFireDatabase) { }

  getTodoList(){
      this.todoList = this.firebaseDB.list('titles');
      return this.todoList;
  }

  addTaskTitle(taskTitle: string){
      this.todoList.push({
        title: taskTitle,
        isDone: false
      });
  }

  markDoneOrUndone(id: string, flag: boolean){
      this.todoList.update(id, {isDone: flag});
  }

  deleteTitle(id: string){
      this.todoList.remove(id);
  }

}
