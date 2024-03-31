import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UpdateProjectData} from 'src/app/shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-project-modal',
  templateUrl: './update-project-modal.component.html',
  styleUrls: ['./update-project-modal.component.css']
})
export class UpdateProjectModalComponent{
  @Output() close = new EventEmitter<void>();
  @Output() updatedProjectSubmitted: EventEmitter<UpdateProjectData> = new EventEmitter();
  @Input() updateName:string='';
  @Input() updateDescription:string='';
  
  name = '';
  description = '';

  yesOrNo: string [] = ['Yes', 'No']

  choice: string = '';

  projectForm: FormGroup;

  placeHoldername:string ='';

  isActive: boolean = false;

  constructor(private formBuilder: FormBuilder){
    this.projectForm = this.formBuilder.group({
      projectName: [''],
      description: [''],
      isActive: [''], // Define 'isActive' form control here
    });
  }

  closeModal() {
    this.close.emit();
  }

  submit() {


    console.log("submitted")

    if (this.projectForm.valid) {

      if(this.projectForm.get('isActive')?.value === "Yes"){
        this.isActive = true;
      }

      const newProjectData: UpdateProjectData = {
        name: this.projectForm.value.projectName,
        description: this.projectForm.value.description,
        active: this.isActive
      }

      this.updateName = this.name;
      this.updateDescription = this.description;

      this.updatedProjectSubmitted.emit(newProjectData);

      this.closeModal();
    } else {
      this.projectForm.markAllAsTouched();
    }
  }

  addChoice(){
    console.log("enters in add choice")
  }

}
