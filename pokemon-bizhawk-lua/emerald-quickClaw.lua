-- Pokemon Emerald Quick Claw

function checkQuickClaw()
    local gRandomTurnNumber = memread(0x2024330, 2)
    if gRandomTurnNumber < (0xFFFF * 20) / 100 then
        gui.pixelText(3, 15 , "true", "yellow")
    else
        gui.pixelText(3, 15, "false", "yellow")
    end
end

function memread(addr, size)
    mem = ""
    memdomain = bit.rshift(addr, 24)
    if memdomain == 0 then
        mem = "BIOS"
    elseif memdomain == 2 then
        mem = "EWRAM"
    elseif memdomain == 3 then
        mem = "IWRAM"
    elseif memdomain == 8 then
        mem = "ROM"
    end
    addr = bit.band(addr, 0xFFFFFF)
    if size == 1 then
        return memory.read_u8(addr,mem)
    elseif size == 2 then
        return memory.read_u16_le(addr,mem)
    elseif size == 3 then
        return memory.read_u24_le(addr,mem)
    else
        return memory.read_u32_le(addr,mem)
    end
end

local game = 0
-- Check if game is emerald
a = memory.read_u32_be(0x0000AC, "ROM")
if a ~= 0x42504545 then
	game = 1
    gamename = "EME:  "
end

if game == 0 then
    while true do
        checkQuickClaw()
        emu.frameadvance()
    end
end

emu.frameadvance()