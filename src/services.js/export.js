const exportHotspots = (hotspots) => {
  const blob = new Blob([JSON.stringify(hotspots, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = 'hotspots.json';
  a.click();

  URL.revokeObjectURL(url);
};

export { exportHotspots };