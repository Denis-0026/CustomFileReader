import { ChangeDetectionStrategy, Component, input, InputSignal, output } from '@angular/core';

@Component({
  selector: 'lib-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent<T extends { id: number }> {
  public readonly dataList: InputSignal<T[] | undefined> = input();
  public readonly rowClickEvent = output<number>();

  rowClick(rowId: number): void {
    this.rowClickEvent.emit(rowId);
  }
}
