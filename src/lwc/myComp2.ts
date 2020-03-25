import { LightningElement, api } from "lwc";
import { DateTime } from "luxon";
import handlebars from "handlebars";

export default class MyComp1 extends LightningElement {
  @api
  templateText: string = "Current datetime is {{ now }}.";

  get previewText() {
    if (this.templateText) {
      try {
        const tpl = handlebars.compile(this.templateText);
        return tpl({ now: DateTime.local().toISO() });
      } catch (e) {}
    }
    return "";
  }

  handleChangeTemplateText(e: InputEvent) {
    this.templateText = (e.target as HTMLInputElement).value;
  }
}
