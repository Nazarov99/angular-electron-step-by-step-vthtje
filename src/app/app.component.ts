import { Component } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular + Electron';
  pong: String = 'ping';

  constructor(private _electronService: ElectronService){
    if(this._electronService.isElectronApp) {
      this.pingPong();
    }
  }
  async pingPong(){
    let pong: string = await this._electronService.ipcRenderer.invoke('ping');
    console.log(pong);
    this.pong = pong;
  }
}
