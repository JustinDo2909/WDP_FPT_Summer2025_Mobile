import mitt from "mitt";
import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter";
export const eventEmitter = new EventEmitter();

export const onSetLoading = (status?: boolean) => {
  eventEmitter.emit("Loading", status);
};
export const eventBus = mitt();
