import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {
  FormBuilder,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public listOfWords: string[] = ['This', 'Is', 'Some', 'Word'];
  public wordOfTheDay: string = '';
  public lenArr: number[] = [];
  public formGroup?: UntypedFormGroup;

  constructor(private formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.generateRandomWord();
    this.generateRangeArray();
    this.initForm();
  }

  public generateRandomWord(): void {
    const randomIndex = Math.floor(Math.random() * this.listOfWords.length);
    this.wordOfTheDay = this.listOfWords[randomIndex];
  }

  public generateRangeArray(): void {
    for (let i = 0; i < this.wordOfTheDay.length; ++i) {
      this.lenArr.push(i);
    }
  }

  public initForm(): void {
    this.formGroup = this.formBuilder.group({
      inputsArr: new UntypedFormArray([]),
    });
    for (let i = 0; i < this.listOfWords.length; ++i) {
      let formArr = this.formGroup.get('inputsArr') as UntypedFormArray;
      formArr.push(new UntypedFormControl(null, [Validators.maxLength(1)]));
    }
  }

  public get getFormArray(): UntypedFormArray {
    return this.formGroup?.get('inputsArr') as UntypedFormArray;
  }

  public onInputKeyUp(arrSequence, e): void {
    const keyCode = e.keyCode || e.which;
    if (
      (keyCode >= 112 && keyCode <= 123) ||
      keyCode === 9 ||
      keyCode === 37 ||
      keyCode === 39 ||
      keyCode === 38 ||
      keyCode === 40 ||
      keyCode === 27 ||
      keyCode === 46 ||
      keyCode === 8
    ) {
      return;
    }
    e.preventDefault();
    if ((keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)) {
      this.getFormArray.at(arrSequence).patchValue(e.key);
      this.focusNextElement(e);
      return;
    }
  }

  public focusNextElement(e): void {
    var target = e.target;
    target = target.nextElementSibling;
    target.focus();
  }
}
