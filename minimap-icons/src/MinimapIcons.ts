import {Plugin, SettingsTypes} from "@highlite/plugin-api";
import bankIcon from "../resources/images/Bank_icon.png";
import anvilIcon from "../resources/images/Anvil_icon.png";
import furnaceIcon from "../resources/images/Furnace_icon.png";
import rockIcon from "../resources/images/Rock_icon.png";
import coalIcon from "../resources/images/Coal_icon.png";
import palladiumIcon from "../resources/images/Palladium_icon.png";
import dungeonIcon from "../resources/images/Dungeon_icon.png";
import deadTreeIcon from "../resources/images/Dead_tree_icon.png";
import treeIcon from "../resources/images/Tree_icon.png";
import plantIcon from "../resources/images/Fern_icon.png";
import ladderIcon from "../resources/images/Ladder_icon.png";
import oakTreeIcon from "../resources/images/Oak_tree_icon.png";
import axeShopIcon from "../resources/images/Axe_shop_icon.png";
import fishingSpotIcon from "../resources/images/Fishing_spot_icon.png";
import tinIcon from "../resources/images/Tin_icon.png";
import copperIcon from "../resources/images/Copper_icon.png";
import ironIcon from "../resources/images/Iron_icon.png";
import silverIcon from "../resources/images/Silver_icon.png";
import goldIcon from "../resources/images/Gold_icon.png";
import cookingIcon from "../resources/images/Cooking_icon.png";
import farmingIcon from "../resources/images/Farming_icon.png";
import palmTreeIcon from "../resources/images/Palm_tree_icon.png";
import pineTreeIcon from "../resources/images/Pine_tree_icon.png";
import cherryBlossomTreeIcon from "../resources/images/Cherry_blossom_tree_icon.png";
import moneyTreeIcon from "../resources/images/Money_tree_icon.png";
import deadwoodTreeIcon from "../resources/images/Deadwood_tree_icon.png";
import gemShopIcon from "../resources/images/Gem_shop_icon.png";
import shopIcon from "../resources/images/Shop_icon.png";
import platelegsShopIcon from "../resources/images/Platelegs_shop_icon.png";
import swordShopIcon from "../resources/images/Sword_shop_icon.png";
import platebodyShopIcon from "../resources/images/Platebody_shop_icon.png";
import craftingTableIcon from "../resources/images/Crafting_table_icon.png";
import magicShopIcon from "../resources/images/Magic_shop_icon.png";
import shieldShopIcon from "../resources/images/Shield_shop_icon.png";

export enum CompareField {
    Name = 'name',
    Description = 'description',
    Action = 'action',
}

export enum CompareType {
    Equals = 'equals',
    Contains = 'contains',
    Includes = 'includes',
}

export interface IconConfig {
    field: CompareField;
    compareType: CompareType;
    value: string;
    icon: string;
}

interface MinimapIcon {
    element: HTMLElement;
    entityId: number;
    entityType: 'npc' | 'object';
    defId: number;
    name: string;
    iconType: string;
    position: { x: number; z: number };
}

class MinimapIcons extends Plugin {
    pluginName = 'Minimap Icons';
    author = 'JayArrowz';

    private minimapContainer: HTMLDivElement | null = null;
    private minimapIcons: Map<number, MinimapIcon> = new Map();

    // Icon configuration array
    private iconConfigs: IconConfig[] = [
        {
            field: CompareField.Description,
            compareType: CompareType.Equals,
            value: "jack's axes",
            icon: axeShopIcon,
        },
        {
            field: CompareField.Description,
            compareType: CompareType.Equals,
            value: 'gem shop',
            icon: gemShopIcon,
        },
        {
            field: CompareField.Description,
            compareType: CompareType.Equals,
            value: "greg's legs",
            icon: platelegsShopIcon,
        },
        {
            field: CompareField.Description,
            compareType: CompareType.Equals,
            value: "arthur's quality weaponry",
            icon: swordShopIcon,
        },
        {
            field: CompareField.Action,
            compareType: CompareType.Equals,
            value: 'harvest',
            icon: farmingIcon,
        },

        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'bartender',
            icon: anvilIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'shop owner',
            icon: shopIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'rock',
            icon: rockIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'palm tree',
            icon: palmTreeIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'pine tree',
            icon: pineTreeIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'cherry blossom',
            icon: cherryBlossomTreeIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'money tree',
            icon: moneyTreeIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'deadwood tree',
            icon: deadwoodTreeIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'plant',
            icon: plantIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'stove',
            icon: cookingIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'tree',
            icon: treeIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'oak tree',
            icon: oakTreeIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'ladder',
            icon: ladderIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'cave',
            icon: dungeonIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'fishing spot',
            icon: fishingSpotIcon,
        },

        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'banker',
            icon: bankIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'anvil',
            icon: anvilIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'furnace',
            icon: furnaceIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'coal rocks',
            icon: coalIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'tin rocks',
            icon: tinIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'copper rocks',
            icon: copperIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'iron rocks',
            icon: ironIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'silver rocks',
            icon: silverIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'gold rocks',
            icon: goldIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'palladium rocks',
            icon: palladiumIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Includes,
            value: 'dead tree',
            icon: deadTreeIcon,
        },
        {
            field: CompareField.Description,
            compareType: CompareType.Includes,
            value: "nate's plates",
            icon: platebodyShopIcon,
        },
        {
            field: CompareField.Description,
            compareType: CompareType.Includes,
            value: 'clydes capes',
            icon: shopIcon,
        },
        {
            field: CompareField.Description,
            compareType: CompareType.Includes,
            value: 'I can craft items here',
            icon: craftingTableIcon,
        },
        {
            field: CompareField.Description,
            compareType: CompareType.Includes,
            value: 'magical scroll shop',
            icon: magicShopIcon,
        },
        {
            field: CompareField.Description,
            compareType: CompareType.Includes,
            value: 'shield shop',
            icon: shieldShopIcon,
        },
        {
            field: CompareField.Name,
            compareType: CompareType.Equals,
            value: 'traveling merchant',
            icon: shopIcon,
        },
    ];

    constructor() {
        super();

        this.settings.enable = {
            text: 'Enable Minimap Icons',
            type: SettingsTypes.checkbox,
            value: false, // Default to false
            callback: () => this.toggleVisibility(),
        };

        this.settings.showNPCs = {
            text: 'Show NPC Icons',
            type: SettingsTypes.checkbox,
            value: true,
            callback: () => this.updateIconVisibility(),
        };

        this.settings.showObjects = {
            text: 'Show Object Icons',
            type: SettingsTypes.checkbox,
            value: true,
            callback: () => this.updateIconVisibility(),
        };

        this.settings.iconSize = {
            text: 'Icon Size (8-20px)',
            type: SettingsTypes.range,
            value: 15,
            callback: () => this.updateIconSizes(),
        };

        this.settings.maxDistance = {
            text: 'Max Display Distance',
            type: SettingsTypes.range,
            value: 50,
            callback: () => {},
        };

        this.settings.clusterDistance = {
            text: 'Cluster Distance (prevent nearby duplicates)',
            type: SettingsTypes.range,
            value: 4,
            callback: () => {},
        };
    }

    init(): void {
        this.log('Initializing Minimap Icons');
    }

    start(): void {
        this.log('Started Minimap Icons');
        this.setMinimapContainer();
        this.addCSSStyles();

        if (this.settings.enable.value) {
            this.updateIconVisibility();
        }
    }

    stop(): void {
        this.log('Stopped Minimap Icons');
        this.cleanupAllIcons();
        this.removeCSSStyles();
    }

    GameLoop_draw(): void {
        if (!this.settings.enable.value || !this.minimapContainer) return;

        this.updateNPCIcons();
        this.updateObjectIcons();
        this.updateIconPositions();
        this.cleanupStaleIcons();
    }

    private setMinimapContainer(): void {
        this.minimapContainer = document.getElementById(
            'hs-minimap-container'
        ) as HTMLDivElement | null;
        if (!this.minimapContainer) {
            this.log('Minimap container not found');
        }
    }

    private hasAction(npcOrObject: any, actionName: string): boolean {
        const actions = npcOrObject._actions;
        if (!actions) return false;

        for (const action of actions) {
            if (
                this.gameLookups.GameWorldActions[
                    action
                    ].toLowerCase() === actionName.toLowerCase()
            ) {
                return true;
            }
        }

        return false;
    }

    private getFieldValue(npcOrObject: any, field: CompareField): string {
        switch (field) {
            case CompareField.Name:
                return (
                    npcOrObject._name ||
                    npcOrObject._def._name ||
                    npcOrObject.Name ||
                    ''
                ).toLowerCase();
            case CompareField.Description:
                return (
                    npcOrObject._description ||
                    npcOrObject._def._description ||
                    npcOrObject.Description ||
                    ''
                ).toLowerCase();
            case CompareField.Action:
                return ''; // Special handling needed in matchesConfig
            default:
                return '';
        }
    }

    private matchesConfig(npcOrObject: any, config: IconConfig): boolean {
        if (config.field === CompareField.Action) {
            return this.hasAction(npcOrObject, config.value);
        }

        const fieldValue = this.getFieldValue(npcOrObject, config.field);
        const compareValue = config.value.toLowerCase();

        switch (config.compareType) {
            case CompareType.Equals:
                return fieldValue === compareValue;
            case CompareType.Contains:
            case CompareType.Includes:
                return fieldValue.includes(compareValue);
            default:
                return false;
        }
    }

    private getMinimapIcon(npcOrObject: any): string {
        for (const config of this.iconConfigs) {
            if (this.matchesConfig(npcOrObject, config)) {
                return config.icon;
            }
        }
        return '';
    }

    private updateNPCIcons(): void {
        if (!this.settings.showNPCs.value) return;

        try {
            const npcs =
                this.gameHooks?.EntityManager?.Instance?._npcs;
            const mainPlayer =
                this.gameHooks?.EntityManager?.Instance
                    ?.MainPlayer;

            if (!npcs || !mainPlayer) return;

            const playerPos = mainPlayer.CurrentGamePosition;
            const maxDistance = this.settings.maxDistance.value as number;

            for (const [entityId, npc] of npcs) {
                if (!npc || !npc._def) continue;

                const defId = npc._def._id;

                // Check distance
                const npcPos =
                    npc._currentGamePosition || npc._lastGamePosition;
                if (npcPos && playerPos) {
                    const distance = Math.sqrt(
                        Math.pow(npcPos._x - playerPos.X, 2) +
                        Math.pow(npcPos._z - playerPos.Z, 2)
                    );
                    if (distance > maxDistance) continue;
                }

                if (!this.minimapIcons.has(entityId)) {
                    const entityPos = npcPos || { _x: 0, _z: 0 };
                    if (!this.shouldCreateIcon('npc', npc, entityPos)) continue;
                    this.createIcon(
                        entityId,
                        'npc',
                        defId,
                        npc._name || `NPC ${defId}`,
                        npc,
                        entityPos
                    );
                }
            }
        } catch (error) {
            console.error('Error updating NPC icons:', error);
        }
    }

    private updateObjectIcons(): void {
        if (!this.settings.showObjects.value) return;

        try {
            const objects =
                this.gameHooks?.WorldEntityManager?.Instance
                    ?._worldEntities;
            const mainPlayer =
                this.gameHooks?.EntityManager?.Instance
                    ?.MainPlayer;

            if (!objects || !mainPlayer) return;

            const playerPos = mainPlayer.CurrentGamePosition;
            const maxDistance = this.settings.maxDistance.value as number;

            for (const [entityId, obj] of objects) {
                if (!obj || !obj._def) continue;

                const defId = obj._def._id;

                // Check distance
                const objPos =
                    obj._currentGamePosition || obj._lastGamePosition;
                if (objPos && playerPos) {
                    const distance = Math.sqrt(
                        Math.pow(objPos._x - playerPos.X, 2) +
                        Math.pow(objPos._z - playerPos.Z, 2)
                    );
                    if (distance > maxDistance) continue;
                }

                if (!this.minimapIcons.has(entityId)) {
                    const entityPos = objPos || { _x: 0, _z: 0 };
                    if (!this.shouldCreateIcon('object', obj, entityPos))
                        continue;
                    this.createIcon(
                        entityId,
                        'object',
                        defId,
                        obj._name || `Object ${defId}`,
                        obj,
                        entityPos
                    );
                }
            }
        } catch (error) {
            console.error('Error updating object icons:', error);
        }
    }

    private shouldCreateIcon(
        entityType: 'npc' | 'object',
        entity: any,
        entityPos: any
    ): boolean {
        const iconType = this.getMinimapIcon(entity);

        if (!iconType || iconType === '') return false;

        const currentPos = { x: entityPos._x, z: entityPos._z };
        const entityName =
            entity._name || entity._def._name || entity.Name || '';

        // Check if there's already an icon of the same type within cluster distance
        for (const [existingId, existingIcon] of this.minimapIcons) {
            if (existingIcon.iconType === iconType) {
                const distance = Math.sqrt(
                    Math.pow(currentPos.x - existingIcon.position.x, 2) +
                    Math.pow(currentPos.z - existingIcon.position.z, 2)
                );
                if (
                    distance <= (this.settings.clusterDistance.value as number)
                ) {
                    return false; // Don't create icon - too close to existing one
                }
            }
        }
        return true; // OK to create icon
    }

    private createIcon(
        entityId: number,
        entityType: 'npc' | 'object',
        defId: number,
        name: string,
        entity: any,
        entityPos: any
    ): void {
        if (!this.minimapContainer) return;

        const iconContainer = document.createElement('div');
        iconContainer.className = `minimap-icon minimap-icon-${entityType}`;
        iconContainer.style.position = 'absolute';
        iconContainer.style.pointerEvents = 'none';
        iconContainer.style.display = 'flex';
        iconContainer.style.flexDirection = 'column';
        iconContainer.style.alignItems = 'center';
        iconContainer.style.transform = 'translate(-50%, -50%)';

        // Create the icon image
        const iconImg = document.createElement('img');
        iconImg.className = `minimap-icon-img minimap-icon-img-${entityType}`;
        iconImg.src = this.getMinimapIcon(entity);
        iconImg.style.width = `${this.settings.iconSize.value}px`;
        iconImg.style.height = `${this.settings.iconSize.value}px`;
        iconImg.style.borderRadius = '3px';

        iconContainer.appendChild(iconImg);

        // Create name label (hidden by default, shown on hover)
        const nameLabel = document.createElement('div');
        nameLabel.className = 'minimap-icon-name';
        nameLabel.textContent = name;
        nameLabel.style.fontSize = '8px';
        nameLabel.style.fontWeight = 'bold';
        nameLabel.style.color = '#fff';
        nameLabel.style.textShadow = '1px 1px 1px rgba(0,0,0,0.8)';
        nameLabel.style.whiteSpace = 'nowrap';
        nameLabel.style.marginTop = '2px';
        nameLabel.style.maxWidth = '60px';
        nameLabel.style.overflow = 'hidden';
        nameLabel.style.textOverflow = 'ellipsis';
        nameLabel.style.display = 'none'; // Hidden by default

        iconContainer.appendChild(nameLabel);

        // Add tooltip
        iconContainer.title = `${name} (${entityType.toUpperCase()} ID: ${defId})`;

        this.minimapContainer.appendChild(iconContainer);

        const icon: MinimapIcon = {
            element: iconContainer,
            entityId,
            entityType,
            defId,
            name,
            iconType: this.getMinimapIcon(entity),
            position: { x: entityPos._x, z: entityPos._z },
        };

        this.minimapIcons.set(entityId, icon);
    }

    private updateIconPositions(): void {
        try {
            const mm =
                this.gameHooks.UIManager._manager?._controller?._minimapQuadrantController?.MinimapController?._minimap;
            if (!mm) return;

            const npcs =
                this.gameHooks?.EntityManager?.Instance?._npcs;
            const objects =
                this.gameHooks?.WorldEntityManager?.Instance
                    ?._worldEntities;

            for (const [entityId, icon] of this.minimapIcons) {
                let entity: any = null;
                let entityPos: any = null;

                if (icon.entityType === 'npc' && npcs) {
                    entity = npcs.get(entityId);
                    entityPos =
                        entity?._currentGamePosition ||
                        entity?._lastGamePosition;
                } else if (icon.entityType === 'object' && objects) {
                    entity = objects.get(entityId);
                    entityPos =
                        entity?._currentGamePosition ||
                        entity?._lastGamePosition;
                }

                if (!entity || !entityPos) {
                    icon.element.style.visibility = 'hidden';
                    continue;
                }

                const off = { X: 0, Y: 0 };
                const x = entityPos._x + 0.5;
                const z = entityPos._z + 0.5;

                mm._calculatePosition(
                    (x - mm._currentMiniMapCenter.X) * mm._mapZoomFactor,
                    (mm._currentMiniMapCenter.Y - z) * mm._mapZoomFactor,
                    0,
                    0,
                    off
                );

                const left = mm._minimapHalfWidthPx + off.X;
                const top = mm._minimapHalfHeightPx + off.Y;

                icon.element.style.left = `${left}px`;
                icon.element.style.top = `${top}px`;
                icon.element.style.visibility = 'visible';

                // Update stored position for clustering calculations
                icon.position = { x: entityPos._x, z: entityPos._z };
            }
        } catch (error) {
            console.error('Error updating icon positions:', error);
        }
    }

    private cleanupStaleIcons(): void {
        try {
            const npcs =
                this.gameHooks?.EntityManager?.Instance?._npcs;
            const objects =
                this.gameHooks?.WorldEntityManager?.Instance
                    ?._worldEntities;

            const toRemove: number[] = [];

            for (const [entityId, icon] of this.minimapIcons) {
                let entityExists = false;

                if (icon.entityType === 'npc' && npcs) {
                    entityExists = npcs.has(entityId);
                } else if (icon.entityType === 'object' && objects) {
                    entityExists = objects.has(entityId);
                }

                if (!entityExists) {
                    toRemove.push(entityId);
                }
            }

            toRemove.forEach(entityId => {
                this.removeIcon(entityId);
            });
        } catch (error) {
            console.error('Error cleaning up stale icons:', error);
        }
    }

    private removeIcon(entityId: number): void {
        const icon = this.minimapIcons.get(entityId);
        if (icon) {
            if (icon.element.parentElement) {
                icon.element.parentElement.removeChild(icon.element);
            }
            this.minimapIcons.delete(entityId);
        }
    }

    private cleanupAllIcons(): void {
        this.minimapIcons.forEach((icon, entityId) => {
            this.removeIcon(entityId);
        });
        this.minimapIcons.clear();
    }

    private toggleVisibility(): void {
        if (this.settings.enable.value) {
            this.updateIconVisibility();
        } else {
            this.cleanupAllIcons();
        }
    }

    private updateIconVisibility(): void {
        if (!this.settings.enable.value) {
            this.cleanupAllIcons();
            return;
        }

        // Remove icons for disabled types
        const toRemove: number[] = [];

        for (const [entityId, icon] of this.minimapIcons) {
            const shouldShow =
                (icon.entityType === 'npc' && this.settings.showNPCs.value) ||
                (icon.entityType === 'object' &&
                    this.settings.showObjects.value);

            if (!shouldShow) {
                toRemove.push(entityId);
            }
        }

        toRemove.forEach(entityId => {
            this.removeIcon(entityId);
        });
    }

    private updateIconSizes(): void {
        const newSize = this.settings.iconSize.value as number;

        this.minimapIcons.forEach(icon => {
            const img = icon.element.querySelector(
                '.minimap-icon-img'
            ) as HTMLImageElement;
            if (img) {
                img.style.width = `${newSize}px`;
                img.style.height = `${newSize}px`;
            }
        });
    }

    private addCSSStyles(): void {
        if (document.getElementById('minimap-icons-styles')) return;

        const style = document.createElement('style');
        style.id = 'minimap-icons-styles';
        style.textContent = `
            .minimap-icon {
                transform-origin: center;
                transition: transform 0.2s ease;
            }
            
            .minimap-icon:hover {
                transform: scale(1.2);
            }
            
            .minimap-icon:hover .minimap-icon-name {
                display: block !important;
            }
                        
            .minimap-icon-name {
                background: rgba(0, 0, 0, 0.7);
                padding: 1px 3px;
                border-radius: 2px;
                font-family: Inter, sans-serif;
            }
        `;
        document.head.appendChild(style);
    }

    private removeCSSStyles(): void {
        const style = document.getElementById('minimap-icons-styles');
        if (style) {
            style.remove();
        }
    }
}
var MinimapIcons_default = MinimapIcons;
export {
    MinimapIcons,
    MinimapIcons_default as default,
}
