import { Component, OnInit } from '@angular/core';
import { ToDoService } from './shared/to-do.service';
import { element } from 'protractor';




@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  providers: [ToDoService]
})
export class ToDoComponent implements OnInit {
  todoListArray: any[];
  constructor(private todoService: ToDoService) { }

  ngOnInit() {
     this.todoService.getTodoList()
    .snapshotChanges()
    .subscribe(node => {
        this.todoListArray = [];
        node.forEach(element => {
            var i= element.payload.toJSON();
            i["id"] = element.key;
            this.todoListArray.push(i);
        }); 
        
        //sorting the array from incomplete(isChecked is false) to completed: done
        this.todoListArray.sort((a, b) => {
            return a.isDone - b.isDone;
        })

    });
  }
  addTask(taskTitle){
    this.todoService.addTaskTitle(taskTitle.value);
    taskTitle.value = null; 
  }

  toggleCheck(id: string, isDone){
    this.todoService.markDoneOrUndone(id, !isDone);
  }

  deleteTask(id: string){
    this.todoService.deleteTitle(id);
  }

}
