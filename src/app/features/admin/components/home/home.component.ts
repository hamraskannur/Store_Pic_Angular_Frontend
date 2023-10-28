import { Component,OnInit } from '@angular/core';
import { AdminApiService } from '../../services/admin-api.service';
import { User } from 'src/app/core/models/interceptors';
import { ToastrCallService } from 'src/app/features/user/services/toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  alert=false
  users?:User[]
  deleteUser?:User
  loding=false
  constructor(private AdminApiService:AdminApiService,private ToastrService:ToastrCallService){}


  ngOnInit(): void {
    
    this.AdminApiService.getUsers().subscribe(({users}:{message: string, status: Boolean,users:User[]})=>{
            this.users=users
            console.log(users);
            
    })
  }

  blockUser(user:User){
    this.loding=true
    this.AdminApiService.blockUser(user._id).subscribe(({status}:{message: string, status: Boolean})=>{
      this.alert=false
      this.loding=false
      if(status){
        if(user.status){
          this.ToastrService.showSuccess("successfully blocked user")
        }else{
          this.ToastrService.showSuccess("successfully unblocked user")

        }
        user.status=!user.status
      }
      
})
  }


  blockUserAlert(user:User){
    this.deleteUser=user
    this.alert=true
  }

  cancelblock(){
    this.alert=false
  }
}
