import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";

export const Nav = () => {
  const location = useLocation();
  return (
    <Menu selectedKeys={[location.pathname]} mode="horizontal">
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/liveboard">
        <Link to="/liveboard">Liveboard</Link>
      </Menu.Item>
      <Menu.Item key="/viz">
        <Link to="/viz">Viz</Link>
      </Menu.Item>
      <Menu.Item key="/search">
        <Link to="/search">Search</Link>
      </Menu.Item>
      <Menu.Item key="/full">
        <Link to="/full">Full App</Link>
      </Menu.Item>
    </Menu>
  );
};
