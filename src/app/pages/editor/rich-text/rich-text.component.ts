import { Component, OnInit, SecurityContext, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

enum FroalaEventAction{
  FroalaFocus  = 'INTERNAL_FROALA_FOCUS',
  FroalaBlur  = 'INTERNAL_FROALA_BLUR',
  FroalaChange = 'INTERNAL_FROALA_CHANGE',
}



@Component({
  selector: 'app-display-code',
  template: `
    <code>{{ data }}</code>
  `
})
export class DisplayCodeComponent{
  @Input('data') data:any;
}



@Component({
  selector: 'app-rich-text',
  templateUrl: './rich-text.component.html',
  styleUrls: ['./rich-text.component.less']
})
export class RichTextComponent implements OnInit {


  froalaContent:string = "<p>Hello, this is <strong>bold</strong>, this is <em>italic</em> and this is <u>underlined</u>. All of them looks like <strong><em><u>this</u></em></strong></p>";
  froalaOptions: Object = {
    placeholderText: 'Start typing your rich text...',
    charCounterCount: false,
    events : {
      'focus' : (e) => this.onFroalaEvent(FroalaEventAction.FroalaFocus, e),
      'blur' : (e) => this.onFroalaEvent(FroalaEventAction.FroalaBlur, e),
      'contentChanged' : (e) => this.onFroalaEvent(FroalaEventAction.FroalaChange, e),
    }
  }

  encodedContent:string;


  constructor(
    private sanitizer: DomSanitizer,
    private modal:NzModalService
  ){}

  ngOnInit(): void {
    this.sanitizeRichText(this.froalaContent)
  }

  onFroalaEvent(eventType:FroalaEventAction, event:any){
    if(eventType === FroalaEventAction.FroalaChange){
      this.sanitizeRichText(this.froalaContent);
    }
  }

  sanitizeRichText(str:string){
    const sanitized = this.sanitizer.sanitize(SecurityContext.HTML, str);
    this.encodedContent = encodeURIComponent(sanitized);
    console.log(this.encodedContent);
    console.log(decodeURIComponent(this.encodedContent))
  }

  decodeRichText(str){
    return decodeURIComponent(str)
  }

  onShowCode(){
    this.showAlert(this.froalaContent, "Show Code")
  }

  onShowSanitized(){
    this.showAlert(this.encodedContent, "Show Sanitized/Encoded")
  }


  showAlert(value:string, title:string){
    const style = {
      maxHeight:'400px',
      overflow:'auto'
    }
    const modalEL: NzModalRef = this.modal.create({
      nzTitle: title,
      nzContent:DisplayCodeComponent,
      nzComponentParams: {
        data:value
      },
      nzCancelText:null,
      nzBodyStyle:style,
    });
  }

}
