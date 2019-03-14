-- Gen3 U TID printer

local game = 2
local gamename = "N/A:  "

function getGame()
	a = memory.read_u32_be(0x0000AC, "ROM")
	if a == 0x41585645 then
		game = 1
        gamename = "RUBY: "
	elseif a == 0x41585045 then
		game = 1
        gamename = "SAPP: "
	elseif a == 0x42504545 then
		game = 0
        gamename = "EME:  "
    end
end

function print_adress()
    local TID
    if game == 0 then
        TID = memread(0x2024AC6, 2)
        TID = string.format("%05d", TID)
    elseif game == 1 then
        TID = memread(0x2024EAE, 2)
        TID = string.format("%05d", TID)
    else
        TID = "?????"
    end

	x = 3
	y = 3
	gui.drawRectangle(2, 2, 46, 8, "black")
	gui.pixelText(x, y , gamename..TID, "yellow")
end

while true do
    getGame()
	print_adress()
	emu.frameadvance()
end