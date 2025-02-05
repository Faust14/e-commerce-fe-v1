import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private readonly timeout = 3000;

  constructor(private snackBar: MatSnackBar) {
  }

  private showAlert(msg: string, type: 'success' | 'danger' | 'warning' | 'info') {
    const config: MatSnackBarConfig = {
      duration: this.timeout,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    };
    this.snackBar.open(msg, 'Close', config);
  }

  success(msg: string) {
    this.showAlert(msg, 'success');
  }

  error(msg: string) {
    this.showAlert(msg, 'danger');
  }

  warning(msg: string) {
    this.showAlert(msg, 'warning');
  }

  info(msg: string) {
    this.showAlert(msg, 'info');
  }
}
