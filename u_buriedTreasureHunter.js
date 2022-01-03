let found = Hud.createDraw3D();
Hud.registerDraw3D(found);

const cubeSize = 50

const reverse = !GlobalVars.getBoolean("buriedTreasureHunterState");
GlobalVars.putBoolean("buriedTreasureHunterState", reverse);

if (reverse) {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
    .append("Utils").withColor(0x6)
    .append("]").withColor(0x7)
    .append(" BuriedTreasureHunter").withColor(0xd)
    .append(" enabled").withColor(0xa).build());
} else {
    Chat.log(Chat.createTextBuilder().append("[").withColor(0x7)
    .append("Utils").withColor(0x6)
    .append("]").withColor(0x7)
    .append(" BuriedTreasureHunter").withColor(0xd)
    .append(" disabled").withColor(0xc).build());
}


let new_box = true;

while (GlobalVars.getBoolean("buriedTreasureHunterState")) {
    let pos = Player.getPlayer().getPos();
    const minX = Math.round(pos.x) + cubeSize/2;
    const minY = Math.round(pos.y) + cubeSize/2;
    const minZ = Math.round(pos.z) + cubeSize/2;
    
    for (x = Math.round(pos.x) - cubeSize/2; x <= minX; x++) {
        for (y = Math.round(pos.y) - cubeSize/2; y <= minY; y++) {
            for (z = Math.round(pos.z) - cubeSize/2; z <= minZ; z++) {
                if ((World.getBlock(x, y, z).getId() == "minecraft:chest") && 
                ((World.getBlock(x, y+1, z).getId() == "minecraft:sand") || (World.getBlock(x, y+1, z).getId() == "minecraft:gravel")))  {
                    new_box = true;
                        for (const e of found.getBoxes()) {
                            if ((e.pos.x1 == x) && (e.pos.y1 == y) && (e.pos.z1 == z)) {
                                new_box = false;
                                break;
                            }
                        }
                    if (new_box) {
                        found.addBox(x, y, z, x+1, y+1, z+1, 0xFFFFFF, 0xFF, 0e28743, 0x32, true);
                    }         
                }
            }
        }
    }
    Time.sleep(20);
}

Hud.unregisterDraw3D(found)
