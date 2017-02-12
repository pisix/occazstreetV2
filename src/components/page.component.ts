export class Page{

  private _title:string;
  private _component:any;
  private _icon:any;


  constructor(titre: string, component: any, icon: any) {
    this._title = titre;
    this._component = component;
    this._icon = icon;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get component(): any {
    return this._component;
  }

  set component(value: any) {
    this._component = value;
  }

  get icon(): any {
    return this._icon;
  }

  set icon(value: any) {
    this._icon = value;
  }
}
