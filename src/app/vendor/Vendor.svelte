<script lang="ts">
    import { getContext } from "svelte";
    import { fade } from "svelte/transition";
    import type { IBountyStore } from "api/utils";
    import related from "api/utils/relatedStore";
    import type { IBounty, IBountyWithPriority, IVendor } from "api/destiny2";
    import type { ICharacterContext } from "api/utils/types";
    import Bounty from "./Bounty.svelte";
    import Icon from "./Icon.svelte";
    import * as vendorConf from "../../vendorConf.json";
    import bountyCache, { bountyHashesByTag } from "api/destiny2/bounties";
    import { showRelated, trackBounty } from "app/bountyActions";

    export let index = 0;
    export let vendor: IVendor;
    export let params: {
        membershipId: string;
        membershipType: string;
        characterId: string;
    };

    const { inventories } = getContext<ICharacterContext>("characters");
    const items: IBounty[] = $inventories[params.characterId];

    const { addBounty, store } = getContext<IBountyStore>("bounty");

    const ignore = vendorConf.ignore.includes(vendor.vendorHash);
    const backgroundColor =
        vendorConf.vendorBackgrounds[vendor.vendorHash] || "grey";
    const hasIcon = !vendorConf.vendorWithoutIcon.includes(vendor.vendorHash);
    const areIconsFlipped = vendorConf.iconsFlipped.includes(vendor.vendorHash);
    const hasNoProgressIcon = vendorConf.noProgressIcon.includes(
        vendor.vendorHash
    );

    let vendorIcon = areIconsFlipped ? vendor.progression?.icon : vendor.icon;
    let progressIcon = hasNoProgressIcon
        ? undefined
        : areIconsFlipped
        ? vendor.icon
        : vendor.progression?.icon;

    $: isDisabled = (bounty: IBounty) => {
        return (
            $store.some((b) => b.hash === bounty.hash) ||
            items.some((b) => b.hash === bounty.hash)
        );
    };
</script>

{#if !ignore}
    <div
        in:fade={{ delay: index * 100, duration: 500 }}
        class="vendor"
        style="--backgroundColor: {backgroundColor}"
    >
        <div class="icon">
            {#if hasIcon}
                <Icon
                    {vendorIcon}
                    {progressIcon}
                    progression={vendor.progression}
                />
            {/if}
        </div>

        <div class="description">
            <h3>
                {vendor.name}
            </h3>
            <div>
                {vendor.description}
            </div>
        </div>

        <div class="bounties">
            {#each vendor.bounties as bounty}
                <Bounty
                    {bounty}
                    actions={[
                        trackBounty(bounty, addBounty),
                        showRelated(bounty),
                    ]}
                    disabled={isDisabled(bounty)}
                />
            {/each}
        </div>
    </div>
{/if}

<style>
    .vendor {
        display: grid;
        column-gap: 20px;
        grid-template-columns: 100px 300px 50%;
        grid-template-areas: "icon description bounties";
        column-gap: 40px;
        padding: 20px 10px 20px 10px;
        min-height: 150px;
        color: #333;
        background: linear-gradient(
            to right,
            var(--backgroundColor),
            transparent
        );
    }

    .icon {
        grid-area: icon;
        align-self: center;
    }

    .bounties {
        display: grid;
        grid-area: bounties;
        align-self: center;
        grid-template-columns: 75px 75px 75px 75px 75px 75px;
        row-gap: 7px;
    }

    .description {
        grid-area: description;
        align-self: center;
    }

    h3 {
        margin: 0;
    }

    @media only screen and (max-width: 1590px) {
        .vendor {
            grid-template-columns: 100px 440px;
            grid-template-rows: auto auto;
            grid-template-areas:
                "icon description"
                "icon bounties";
            row-gap: 20px;
        }

        .bounties {
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
        }
    }

    @media only screen and (max-width: 1025px) {
        .vendor {
            grid-template-columns: 100px 300px;
        }
    }

    @media only screen and (max-width: 835px) {
        .vendor {
            grid-template-areas:
                "description"
                "bounties";
            grid-template-columns: auto;
        }

        .icon {
            display: none;
        }
    }
</style>
