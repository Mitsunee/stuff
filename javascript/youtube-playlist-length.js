/*
How to use:
- open playlist (url like youtube.com/playlist?list={SOMEIDHERE})
- scroll to bottom of playlist (to make sure all videos are loaded)
- open dev console
- paste code
- should return stuff or break :)
*/

(() => {
  const total = [
    ...document.querySelectorAll(
      "span.ytd-thumbnail-overlay-time-status-renderer"
    ),
  ]
    .map(({ innerText }) => innerText)
    .reduce((total, timecode) => {
      const match = timecode.match(/(?:(\d+):)?(?:(\d+):)?(\d)/);
      const h = match[1] ? Number(match[1].trim()) * 3600 : 0;
      const m = match[2] ? Number(match[2].trim()) * 60 : 0;
      const s = Number(match[3].trim()) || 0;

      return total + h + m + s;
    }, 0);

  const s = total % 60;
  const m = ((total - s) / 60) % 60;
  const h = (total - s - m * 60) / 3600;

  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(
    2,
    "0"
  )} (${total} seconds)`;
})();
