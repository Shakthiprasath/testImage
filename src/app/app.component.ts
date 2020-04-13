import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testImage';
  testForm: FormGroup
  file:any
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {
    this.testForm = this.fb.group({
      clientId: '',
      location: '',
      meetingPoc: '',
      meetingPocEmail: '',
      meetingPocNumber: '',
      meetingDesig: '',
      userId: '',
      meetingMom: '',
      meetingDate: '',
      remainderOn: '',
    })
  }

  submitData() {
    console.log("form group", this.testForm.value)
    var formData = new FormData()
    for(let obj in this.testForm.value) {
      formData.append(obj, this.testForm.get(obj).value)
    }
    formData.append('files', this.file[0])
    console.log('posdat', formData);
    this.httpClient.post('http://localhost:8841/api/ClientMeeting/CreateClientMeeting', formData).subscribe(res => {
       console.log("response", res)
    })
  }

  filevent(event) {
    console.log("event", event.target.files)
    this.file = event.target.files
  }

}
