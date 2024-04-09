function Header() {
  return (
    <h1 style={{ fontSize: '24px', width:'100%', textAlign: 'center' }}>Word Trends of Major U.S. News Outlets</h1>
  )
}

function WordCount({ word, count}) {
  return (
    <td>{word}:{count}</td>
  )
}

function WordRow({ word_count }) {
  return (
    <tr>{word_count}</tr>
  )
}

function Site({ site }) {
  return (
    <th>
      {site}
    </th>
  )
}

function SiteDiv({ site }) {
  return (
    <div style={{width: '100%', textAlign: 'center'}}>{site}</div>
  )
}

function SiteWordCount({ word, count }) {
  return (
    <div style={{width: '100%', textAlign: 'center'}}>{word}: {count}</div>
  )
}

function SiteContainer({ site, word_counts }) {
  const site_word_counts = [];
  Object.keys(word_counts).forEach(function(word) {
    site_word_counts.push(<SiteWordCount word={word} count={word_counts[word]} />);
  });

  return (
    <div>
      <SiteDiv site={site} />
      {site_word_counts}
    </div>
  )
} 

function TimeframeContainer({ timeframe, site_containers}) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: '10px' }}>
      <TimeframeDiv timeframe={timeframe} />
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
        {site_containers}
      </div>
    </div>
  )
}

function TimeframeDiv({ timeframe }) {
  return (
    <div style={{ width: '100px' }}>{timeframe}</div>
  )
}

function WordTable({ word_counts }) {
  const timeframe_divs = [];

  word_counts.forEach(function(json) {
    Object.keys(json).forEach(function(timeframe) {
      let site_containers = [];
      json[timeframe].Sites.forEach(function(siteJson) {
        Object.keys(siteJson).forEach(function(site) {
          const useSite = (timeframe_divs.length == 0) ? site : '';
          site_containers.push(<SiteContainer site={useSite} word_counts={siteJson[site]} />)
        });
      });
      timeframe_divs.push(<TimeframeContainer timeframe={timeframe} site_containers={site_containers} />);
    });
  });


  return (
    <div>
      <Header/>
      <div style={{ padding: '1rem' }}>
        {timeframe_divs}
      </div>
    </div>
  )
}

const REPLY = [
  {"Daily" : {"Sites": [{"ap":{"Test":"2","Secondword":"5"}},{"cnn":{"cnnWord":"5","SecondwordC":"8"}},{"fox":{"foxWord":"4","SecondwordF":"7"}},{"nbc":{"nbcTest":"3","SecondwordN":"6"}}]}},
  {"Monthly" : {"Sites": [{"ap":{"MTest":"2","MSecondword":"5"}},{"cnn":{"McnnWord":"5","MSecondwordC":"8"}},{"fox":{"MfoxWord":"4","MSecondwordF":"7"}},{"nbc":{"MnbcTest":"3","MSecondwordN":"6"}}]}}
];

export default function App() {
  return <WordTable word_counts={REPLY}/>;
}