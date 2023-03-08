<script lang="ts">
    import {action} from "@nativescript/core";
    import {Template} from "svelte-native/components";

    let todos = [];
    let textFieldValue = "";
    let dones = []; //completed items go here

    const removeFromList = (list, item) => list.filter((t) => t !== item);
    const addToList = (list, item) => [item, ...list];

    async function onItemTap(args) {
        let result = await action(
            "What do you want to do with this task?",
            "Cancel",
            ["Mark completed", "Delete forever"]
        );

        console.log(result); // Logs the selected option for debugging.
        let item = todos[args.index];
        switch (result) {
            case "Mark completed":
                dones = addToList(dones, item); // Places the tapped active task at the top of the completed tasks.
                todos = removeFromList(todos, item); // Removes the tapped active task.
                break;
            case "Delete forever":
                todos = removeFromList(todos, item); // Removes the tapped active task.
                break;
            case "Cancel" || undefined: // Dismisses the dialog
                break;
        }
    }

    async function onDoneTap(args) {
        let result = await action(
            "What do you want to do with this task?",
            "Cancel",
            ["Mark To Do", "Delete forever"]
        );

        console.log(result); // Logs the selected option for debugging.
        let item = dones[args.index];
        switch (result) {
            case "Mark To Do":
                todos = addToList(todos, item); // Places the tapped active task at the top of the completed tasks.
                dones = removeFromList(dones, item); // Removes the tapped active task.
                break;
            case "Delete forever":
                dones = removeFromList(dones, item); // Removes the tapped active task.
                break;
            case "Cancel" || undefined: // Dismisses the dialog
                break;
        }
    }

    function onButtonTap() {
        if (textFieldValue === "") return; // Prevents users from entering an empty string.
        console.log("New task added: " + textFieldValue + "."); // Logs the newly added task in the console for debugging.
        todos = [{name: textFieldValue}, ...todos]; // Adds tasks in the ToDo array. Newly added tasks are immediately shown on the screen.
        textFieldValue = ""; // Clears the text field so that users can start adding new tasks immediately.
    }
</script>

<page>
    <actionBar title="My Todos"/>
    <bottomNavigation width="100%" id="main-tabview" class="main-tabview"
                          iosOverflowSafeArea="true" selectedIndex="0" tabsPosition="bottom" swipeEnabled="false">
        <!-- The bottom tab UI is created via TabStrip (the containier) and TabStripItem (for each tab)-->
        <tabStrip>
            <tabStripItem class="tab-item">
                <label text="Home" ios:fontSize="10" android:fontSize="12"></label>
            </tabStripItem>
            <tabStripItem class="tab-item">
                <label text="Test" ios:fontSize="10" android:fontSize="12"></label>
            </tabStripItem>
        </tabStrip>

        <!-- The number of TabContentItem components should corespond to the number of TabStripItem components -->
        <tabContentItem>
            <gridLayout>
                <label text="Home" class="h2 text-center"></label>
            </gridLayout>
        </tabContentItem>
        <tabContentItem>
            <gridLayout>
                <label text="Search Page" class="h2 text-center"></label>
            </gridLayout>
        </tabContentItem>
    </bottomNavigation>
</page>


