import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  randomText = "Random text";
  inputText: string = '';
  result: boolean = false;

  // تایمر
  timerRunning: boolean = false;
  elapsedMs: number = 0;
  private timerIntervalId: any = null;
  


  compare(letterRandom:string , letterEnter:string ){
  
    if(!letterEnter){ return "" }

    return letterEnter === letterRandom ? 'correct' :'incorrect';

  }
  onTextEnter(value: string): void {
    if (!this.timerRunning && value.length > 0) {
      this.startTimer();
    }

    this.inputText = value;
    this.result = this.inputText === this.randomText;

    if (this.result) {
      this.stopTimer();
    }
  }

  // شروع تایمر
  private startTimer(): void {
    if (this.timerRunning) return;
    this.timerRunning = true;
    const start = performance.now() - (this.elapsedMs || 0);
    this.timerIntervalId = setInterval(() => {
      const now = performance.now();
      this.elapsedMs = now - start;
    }, 10); // به‌روزرسانی هر 10 میلی‌ثانیه
  }

  // توقف تایمر
  private stopTimer(): void {
    if (this.timerIntervalId) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = null;
    }
    this.timerRunning = false;
  }

  // فرمت سازی برای نمایش زمان
  get formattedTime(): string {
    const totalMs = Math.max(this.elapsedMs, 0);
    const totalSeconds = Math.floor(totalMs / 1000);
    const ms = Math.floor((totalMs % 1000) / 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  }

  // برای ریست مجدد امکان‌پذیر است (اختیاری)
  reset(): void {
    this.inputText = '';
    this.result = false;
    this.elapsedMs = 0;
    this.stopTimer();
  }
}