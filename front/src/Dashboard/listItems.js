import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AdbIcon from '@material-ui/icons/Adb';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const mainListItems = (
  <div>
    <ListItem button onClick={() => {window.location='/dashboard'}}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
    <ListItem button onClick={() => {window.location='/orders'}}>
      <ListItemIcon>
        <ListAltIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItem>
    <ListItem button onClick={() => {window.location='/balances'}}>
      <ListItemIcon>
        <AccountBalanceWalletIcon />
      </ListItemIcon>
      <ListItemText primary="Balances" />
    </ListItem>
    <ListItem button onClick={() => {window.location='/buysell'}}>
      <ListItemIcon>
        <LocalAtmIcon />
      </ListItemIcon>
      <ListItemText primary="Buy & Sell" />
    </ListItem>
    <ListItem button onClick={() => {window.location='/bot'}}>
      <ListItemIcon>
        <AdbIcon />
      </ListItemIcon>
      <ListItemText primary="Bot" />
    </ListItem>
    <ListItem button onClick={() => {localStorage.removeItem("ID_TOKEN"); window.location='/'}}>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Disconnect" />
    </ListItem>
  </div>
);
