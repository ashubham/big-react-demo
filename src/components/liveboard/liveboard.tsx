import { Action, EmbedEvent, HostEvent } from "@thoughtspot/visual-embed-sdk";
import {
  LiveboardEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch } from "antd";
import React from "react";
import { useEventLogger, actionSet } from "../../utils/utils";
import "./liveboard.css";

const { Header, Footer, Sider, Content } = Layout;

export const Liveboard = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const [hiddenActions, setHiddenActions] = React.useState<Action[]>([]);
  const [fullHeight, setFullHeight] = React.useState(false);
  const onToggleHideActions = (checked: boolean) => {
    if (checked) {
      setHiddenActions([]);
    } else {
      setHiddenActions(actionSet);
    }
  };

  const [disabledActions, setDisabledActions] = React.useState<Action[]>([]);
  const onToggleDisabledActions = (checked: boolean) => {
    if (checked) {
      setDisabledActions([]);
    } else {
      setDisabledActions(actionSet);
    }
  };

  const applyFilter = () => {
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: "state",
        operator: "EQ",
        values: ["michigan"]
      }
    ]);
  };
  const resetFilter = () => {
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: "state",
        operator: "EQ",
        values: []
      }
    ]);
  };

  const onCustomAction = (e) => {
    logEvent(e);
    if (e.id === "only-this-viz") {
      embedRef.current.trigger(HostEvent.SetVisibleVizs, [
        "715e4613-c891-4884-be44-aa8d13701c06"
      ]);
      console.log(JSON.parse(e.data));
    }
  };
  const onToggleFullHeight = (checked: boolean) => {
    setFullHeight(checked);
  };

  const selectVizs = () => {
    embedRef.current.trigger(HostEvent.SetVisibleVizs, [
      "715e4613-c891-4884-be44-aa8d13701c06",
      "3f84d633-e325-44b2-be25-c6650e5a49cf"
    ]);
  };
  const reload = () => {
    embedRef.current.trigger(HostEvent.Reload, {});
  };

  return (
    <Layout>
      <Header>
        Liveboard Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        <Sider width={200}>
          <div className="sider-content">
            <Button onClick={applyFilter}>Filter Michigan</Button>
            <Button onClick={resetFilter}>Reset filter</Button>
            <Button onClick={reload}>Reload</Button>
            <Button onClick={selectVizs}>Selected Vizs</Button>
            <Switch
              checkedChildren="Height is Adaptive"
              unCheckedChildren="Height is static"
              onChange={onToggleFullHeight}
            />
            <Switch
              checkedChildren="Actions shown"
              unCheckedChildren="Actions hidden"
              defaultChecked
              onChange={onToggleHideActions}
            />
            <Switch
              checkedChildren="Actions enabled"
              unCheckedChildren="Actions disabled"
              defaultChecked
              onChange={onToggleDisabledActions}
            />
          </div>
        </Sider>

        <Content>
          {/* ThoughtSpot liveboard Embed */ }
          <LiveboardEmbed
            frameParams={{
              height: 400
            }}
            className="liveboard-content"
            ref={embedRef}
            hiddenActions={hiddenActions}
            disabledActions={disabledActions}
            disabledActionReason="Pay $$$"
            fullHeight={fullHeight}
            liveboardId="d084c256-e284-4fc4-b80c-111cb606449a"
            onInit={logEvent(EmbedEvent.Init)}
            onLoad={logEvent("Load")}
            onLiveboardRendered={logEvent}
            onDrilldown={logEvent}
            onCustomAction={onCustomAction}
          />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
