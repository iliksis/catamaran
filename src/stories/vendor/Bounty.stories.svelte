<script lang="ts">
    import { Meta, Template, Story } from "@storybook/addon-svelte-csf";
    import BountyComponent from "../../app/vendor/Bounty.svelte";
</script>

<Meta title="Components/Vendor/Bounty" component={BountyComponent} />

<Template let:args>
    <BountyComponent {...args} />
</Template>

<Story
    name="Standard"
    args={{
        bounty: {
            hash: 123,
            displayProperties: {
                hasIcon: true,
                icon:
                    "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                name: "Horseshoes and Hand Grenades",
                description: "Defeat enemies with grenades.",
                iconSequences: [],
                highResIcon:
                    "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
            },
            objectiveProgress: [
                {
                    progress: 10,
                    completionValue: 20,
                    objectiveProgressDescription: "[Grenade] Grenade",
                },
            ],
        },
        actions: [
            {
                text: "do something",
                action: () => {
                    alert("something happend");
                },
            },
        ],
    }}
/>

<Story
    name="Completed"
    args={{
        bounty: {
            displayProperties: {
                hasIcon: true,
                icon:
                    "https://www.bungie.net/common/destiny2_content/icons/91121c659c5cc0d8938dfe004426c3fd.jpg",
                name: "Horseshoes and Hand Grenades",
                description: "Defeat enemies with grenades.",
            },
            objectiveProgress: [
                {
                    progress: 20,
                    completionValue: 20,
                    objectiveProgressDescription: "[Grenade] Grenade",
                },
            ],
        },
        actions: [
            {
                text: "do something",
                action: () => {
                    alert("something happend");
                },
            },
        ],
    }}
/>
