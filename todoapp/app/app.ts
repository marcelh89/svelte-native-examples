/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first page.
*/

import {svelteNativeNoFrame} from 'svelte-native'
import App from './App.svelte'
import {registerNativeViewElement} from "svelte-native/dom";

const buttomNavigation = require("@nativescript-community/ui-material-bottom-navigation")

registerNativeViewElement("bottomNavigation", () => buttomNavigation.BottomNavigation);
registerNativeViewElement("tabStrip", () => buttomNavigation.TabStrip);
registerNativeViewElement("tabStripItem", () => buttomNavigation.TabStripItem);
registerNativeViewElement("tabContentItem", () => buttomNavigation.TabContentItem);

svelteNativeNoFrame(App, {})
