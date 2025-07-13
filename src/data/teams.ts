export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  league: string;
}

export const teams: Record<string, Team> = {
  'real-madrid': {
    id: 'real-madrid',
    name: 'Real Madrid',
    shortName: 'RMA',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
    colors: { primary: '#FFFFFF', secondary: '#000000' },
    league: 'La Liga'
  },
  'barcelona': {
    id: 'barcelona',
    name: 'Barcelona',
    shortName: 'BAR',
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
    colors: { primary: '#A50044', secondary: '#004D98' },
    league: 'La Liga'
  },
  'manchester-city': {
    id: 'manchester-city',
    name: 'Man City',
    shortName: 'MCI',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
    colors: { primary: '#6CABDD', secondary: '#1C2C5B' },
    league: 'Premier League'
  },
  'arsenal': {
    id: 'arsenal',
    name: 'Arsenal',
    shortName: 'ARS',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
    colors: { primary: '#EF0107', secondary: '#023474' },
    league: 'Premier League'
  },
  'liverpool': {
    id: 'liverpool',
    name: 'Liverpool',
    shortName: 'LIV',
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
    colors: { primary: '#C8102E', secondary: '#F6EB61' },
    league: 'Premier League'
  },
  'chelsea': {
    id: 'chelsea',
    name: 'Chelsea',
    shortName: 'CHE',
    logo: 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
    colors: { primary: '#034694', secondary: '#FFFFFF' },
    league: 'Premier League'
  },
  'psg': {
    id: 'psg',
    name: 'PSG',
    shortName: 'PSG',
    logo: 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
    colors: { primary: '#004170', secondary: '#ED1C24' },
    league: 'Ligue 1'
  },
  'bayern-munich': {
    id: 'bayern-munich',
    name: 'Bayern',
    shortName: 'BAY',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
    colors: { primary: '#DC052D', secondary: '#0066B2' },
    league: 'Bundesliga'
  },
  'juventus': {
    id: 'juventus',
    name: 'Juventus',
    shortName: 'JUV',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Juventus_FC_logo_%282017%29.svg',
    colors: { primary: '#000000', secondary: '#FFFFFF' },
    league: 'Serie A'
  },
  'ac-milan': {
    id: 'ac-milan',
    name: 'AC Milan',
    shortName: 'MIL',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
    colors: { primary: '#FB090B', secondary: '#000000' },
    league: 'Serie A'
  }
};

export const getTeamByName = (name: string): Team | undefined => {
  return Object.values(teams).find(team => 
    team.name.toLowerCase() === name.toLowerCase() || 
    team.shortName.toLowerCase() === name.toLowerCase() ||
    name.toLowerCase().includes(team.name.toLowerCase()) ||
    team.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const getTeamById = (id: string): Team | undefined => {
  return teams[id];
}; 