import React from "react";
import { notification } from "antd";
import { EmbedEvent, Action } from "@thoughtspot/visual-embed-sdk";

export const actionSet = [
  Action.Subscription,
  Action.Share,
  Action.Save,
  Action.Edit,
  Action.EditTitle,
  Action.Explore,
  Action.Pin,
  Action.SpotIQAnalyze,
  Action.DrillDown
];

export function useEventLogger() {
  const t0 = React.useRef(Date.now());

  return function logEvent(nameOrE: any) {
    if (typeof nameOrE === "string") {
      return (e) => {
        e.type = nameOrE;
        logEvent(e);
      };
    }
    if (nameOrE.type === EmbedEvent.Init) {
      t0.current = nameOrE?.data.timestamp;
    }
    const evtDetails = `${nameOrE.type || nameOrE.__type} ${nameOrE.id || ""}`;
    notification.info({
      message: `Event ${evtDetails}`,
      placement: "bottomRight",
      duration: 2
    });
    console.log(
      `[Event] ${evtDetails}`,
      `delta: ${(Date.now() - t0.current) / 1000}`,
      getPrettyEventPayload(nameOrE.data)
    );
  };
}

function getPrettyEventPayload(payload) {
  if (typeof payload === "string") {
    return JSON.parse(payload);
  }
  return payload;
}
