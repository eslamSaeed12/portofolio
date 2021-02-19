import { EventSubscriber, On } from "event-dispatch";
@EventSubscriber()
export default class connectionEvents {
  @On("OnDBConnect")
  onConnect() {
    console.log("database-connected");
  }
}
