let wordList = [
    'able', 'acid', 'aide', 'AIDS', 'ally', 'also', 'amid', 'Arab', 'area', 'army', 'atop', 'aunt', 'auto', 'away', 'baby', 'back', 'bake', 'ball', 'band', 'bank', 'bare', 'barn', 'base', 'bath', 'beam', 'bean', 'bear', 'beat', 'beef', 'beer', 'bell', 'belt', 'bend', 'best', 'bias', 'bike', 'bill', 'bind', 'bird', 'bite', 'blow', 'blue', 'boat', 'body', 'boil', 'bold', 'bolt', 'bomb', 'bond', 'bone', 'book', 'boom', 'boot', 'born', 'boss', 'both', 'bowl', 'buck', 'bulb', 'bulk', 'bull', 'burn', 'bury', 'bush', 'busy', 'butt', 'cage', 'cake', 'call', 'calm', 'camp', 'card', 'care', 'cart', 'case', 'cash', 'cast', 'cave', 'cell', 'chef', 'chew', 'chin', 'chip', 'chop', 'cite', 'city', 'clay', 'clip', 'club', 'clue', 'coal', 'coat', 'code', 'coin', 'cold', 'come', 'cook', 'cool', 'cope', 'copy', 'cord', 'core', 'corn', 'cost', 'coup', 'crew', 'crop', 'cure', 'cute', 'damn', 'dare', 'dark', 'data', 'date', 'dawn', 'dead', 'deal', 'dear', 'debt', 'deck', 'deem', 'deep', 'deer', 'deny', 'desk', 'diet', 'dirt', 'disc', 'dish', 'disk', 'dock', 'doll', 'door', 'dose', 'down', 'drag', 'draw', 'drop', 'drug', 'drum', 'duck', 'dumb', 'dump', 'dust', 'duty', 'each', 'earn', 'ease', 'east', 'easy', 'echo', 'edge', 'edit', 'else', 'even', 'ever', 'evil', 'exam', 'exit', 'face', 'fact', 'fade', 'fail', 'fair', 'fall', 'fame', 'fare', 'farm', 'fast', 'fate', 'fear', 'feed', 'feel', 'file', 'fill', 'film', 'find', 'fine', 'fire', 'firm', 'fish', 'fist', 'five', 'flag', 'flat', 'flee', 'flip', 'flow', 'fold', 'folk', 'food', 'fool', 'foot', 'fork', 'form', 'four', 'free', 'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gang', 'gate', 'gaze', 'gear', 'gene', 'gift', 'girl', 'give', 'glad', 'goal', 'goat', 'gold', 'golf', 'good', 'grab', 'gray', 'grin', 'grip', 'grow', 'hair', 'half', 'hall', 'hand', 'hang', 'hard', 'harm', 'hate', 'haul', 'have', 'head', 'heal', 'hear', 'heat', 'heel', 'hell', 'help', 'herb', 'here', 'hero', 'hers', 'hide', 'high', 'hike', 'hill', 'hint', 'hire', 'hold', 'hole', 'holy', 'home', 'hook', 'hope', 'horn', 'host', 'hour', 'huge', 'hunt', 'hurt', 'icon', 'idea', 'into', 'iron', 'item', 'jail', 'jazz', 'join', 'joke', 'jump', 'jury', 'just', 'keep', 'kick', 'kill', 'kind', 'king', 'kiss', 'knee', 'know', 'lack', 'lady', 'lake', 'lamp', 'land', 'lane', 'last', 'late', 'lawn', 'lead', 'leaf', 'lean', 'leap', 'left', 'lend', 'lens', 'less', 'life', 'lift', 'like', 'limb', 'line', 'link', 'lion', 'list', 'live', 'load', 'loan', 'lock', 'long', 'look', 'loop', 'lose', 'loss', 'lost', 'lots', 'loud', 'love', 'luck', 'lung', 'mail', 'main', 'make', 'male', 'mall', 'many', 'mark', 'mask', 'mass', 'mate', 'math', 'meal', 'mean', 'meat', 'meet', 'melt', 'menu', 'mere', 'mess', 'mild', 'milk', 'mill', 'mind', 'mine', 'miss', 'mode', 'mood', 'moon', 'more', 'most', 'move', 'much', 'must', 'myth', 'nail', 'name', 'near', 'neat', 'neck', 'need', 'nest', 'news', 'next', 'nice', 'nine', 'none', 'noon', 'norm', 'nose', 'note', 'odds', 'okay', 'once', 'only', 'onto', 'open', 'oral', 'ours', 'oven', 'over', 'pace', 'pack', 'page', 'pain', 'pair', 'pale', 'palm', 'pant', 'park', 'part', 'pass', 'past', 'path', 'peak', 'peel', 'peer', 'pick', 'pile', 'pill', 'pine', 'pink', 'pipe', 'plan', 'play', 'plea', 'plot', 'plus', 'poem', 'poet', 'poke', 'pole', 'poll', 'pond', 'pool', 'poor', 'pork', 'port', 'pose', 'post', 'pour', 'pray', 'pull', 'pump', 'pure', 'push', 'quit', 'race', 'rack', 'rage', 'rail', 'rain', 'rank', 'rape', 'rare', 'rate', 'read', 'real', 'rear', 'rely', 'rent', 'rest', 'rice', 'rich', 'ride', 'ring', 'riot', 'rise', 'risk', 'road', 'rock', 'role', 'roll', 'roof', 'room', 'root', 'rope', 'rose', 'ruin', 'rule', 'rush', 'sack', 'safe', 'sail', 'sake', 'sale', 'salt', 'same', 'sand', 'save', 'scan', 'seal', 'seat', 'seed', 'seek', 'seem', 'self', 'sell', 'send', 'sexy', 'shed', 'ship', 'shit', 'shoe', 'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sigh', 'sign', 'silk', 'sing', 'sink', 'site', 'size', 'skin', 'skip', 'slam', 'slap', 'slip', 'slot', 'slow', 'snap', 'snow', 'soak', 'soap', 'soar', 'sock', 'sofa', 'soft', 'soil', 'sole', 'some', 'song', 'soon', 'sort', 'soul', 'soup', 'spin', 'spit', 'spot', 'star', 'stay', 'stem', 'step', 'stir', 'stop', 'such', 'suck', 'suit', 'sure', 'swim', 'tail', 'take', 'tale', 'talk', 'tall', 'tank', 'tape', 'task', 'team', 'tear', 'teen', 'tell', 'tend', 'tent', 'term', 'test', 'text', 'than', 'that', 'them', 'then', 'they', 'thin', 'this', 'thus', 'tide', 'tile', 'till', 'time', 'tiny', 'tire', 'toll', 'tone', 'tool', 'toss', 'tour', 'town', 'trap', 'tray', 'tree', 'trim', 'trip', 'true', 'tube', 'tuck', 'tune', 'turn', 'twin', 'type', 'ugly', 'unit', 'upon', 'urge', 'used', 'user', 'vary', 'vast', 'very', 'view', 'vote', 'wage', 'wait', 'wake', 'walk', 'wall', 'want', 'warm', 'warn', 'wash', 'wave', 'weak', 'wear', 'weed', 'week', 'well', 'west', 'what', 'when', 'whip', 'whom', 'wide', 'wife', 'wild', 'will', 'wind', 'wine', 'wing', 'wipe', 'wire', 'wise', 'wish', 'with', 'wolf', 'wood', 'word', 'work', 'wrap', 'yard', 'yeah', 'year', 'yell', 'your', 'zone', 'TRUE', 'about', 'above', 'abuse', 'actor', 'adapt', 'added', 'admit', 'adopt', 'adult', 'after', 'again', 'agent', 'agree', 'ahead', 'aisle', 'alarm', 'album', 'alien', 'alike', 'alive', 'alley', 'allow', 'alone', 'along', 'alter', 'among', 'angel', 'anger', 'angle', 'angry', 'ankle', 'apart', 'apple', 'apply', 'arena', 'argue', 'arise', 'armed', 'array', 'arrow', 'Asian', 'aside', 'asset', 'avoid', 'await', 'awake', 'award', 'aware', 'awful', 'badly', 'basic', 'basis', 'beach', 'beard', 'beast', 'begin', 'being', 'belly', 'below', 'bench', 'Bible', 'birth', 'black', 'blade', 'blame', 'blank', 'blast', 'blend', 'bless', 'blind', 'blink', 'block', 'blond', 'blood', 'board', 'boast', 'bonus', 'boost', 'booth', 'brain', 'brake', 'brand', 'brave', 'bread', 'break', 'brick', 'bride', 'brief', 'bring', 'broad', 'brown', 'brush', 'buddy', 'build', 'bunch', 'buyer', 'cabin', 'cable', 'candy', 'cargo', 'carry', 'carve', 'catch', 'cause', 'cease', 'chain', 'chair', 'chaos', 'charm', 'chart', 'chase', 'cheap', 'cheat', 'check', 'cheek', 'cheer', 'chest', 'chief', 'child', 'chill', 'chunk', 'civic', 'civil', 'claim', 'class', 'clean', 'clear', 'clerk', 'click', 'cliff', 'climb', 'cling', 'clock', 'close', 'cloth', 'cloud', 'coach', 'coast', 'color', 'couch', 'could', 'count', 'court', 'cover', 'crack', 'craft', 'crash', 'crawl', 'crazy', 'cream', 'crime', 'cross', 'crowd', 'cruel', 'crush', 'Cuban', 'curve', 'cycle', 'daily', 'dance', 'death', 'debut', 'delay', 'dense', 'depth', 'devil', 'diary', 'dirty', 'donor', 'doubt', 'dough', 'dozen', 'draft', 'drain', 'drama', 'dream', 'dress', 'dried', 'drift', 'drill', 'drink', 'drive', 'drown', 'drunk', 'Dutch', 'dying', 'eager', 'early', 'earth', 'eight', 'elbow', 'elder', 'elect', 'elite', 'empty', 'enact', 'enemy', 'enjoy', 'enter', 'entry', 'equal', 'equip', 'error', 'essay', 'event', 'every', 'exact', 'exist', 'extra', 'faint', 'faith', 'fatal', 'fault', 'favor', 'fence', 'fever', 'fewer', 'fiber', 'field', 'fifth', 'fifty', 'fight', 'final', 'first', 'fixed', 'flame', 'flash', 'fleet', 'flesh', 'float', 'flood', 'floor', 'flour', 'fluid', 'focus', 'force', 'forth', 'forty', 'forum', 'found', 'frame', 'fraud', 'fresh', 'front', 'frown', 'fruit', 'fully', 'funny', 'genre', 'ghost', 'giant', 'given', 'glass', 'globe', 'glory', 'glove', 'grace', 'grade', 'grain', 'grand', 'grant', 'grape', 'grasp', 'grass', 'grave', 'great', 'Greek', 'green', 'greet', 'grief', 'gross', 'group', 'guard', 'guess', 'guest', 'guide', 'guilt', 'habit', 'happy', 'harsh', 'heart', 'heavy', 'hello', 'hence', 'honey', 'honor', 'horse', 'hotel', 'house', 'human', 'humor', 'hurry', 'ideal', 'image', 'imply', 'index', 'inner', 'input', 'Iraqi', 'Irish', 'irony', 'Islam', 'issue', 'jeans', 'joint', 'judge', 'juice', 'juror', 'kneel', 'knife', 'knock', 'known', 'label', 'labor', 'large', 'laser', 'later', 'Latin', 'laugh', 'layer', 'learn', 'least', 'leave', 'legal', 'lemon', 'level', 'light', 'limit', 'liver', 'lobby', 'local', 'logic', 'loose', 'lover', 'lower', 'loyal', 'lucky', 'lunch', 'magic', 'major', 'maker', 'march', 'marry', 'match', 'maybe', 'mayor', 'medal', 'media', 'merit', 'metal', 'meter', 'midst', 'might', 'minor', 'mixed', 'model', 'money', 'month', 'moral', 'motor', 'mount', 'mouse', 'mouth', 'movie', 'music', 'naked', 'nasty', 'nerve', 'never', 'newly', 'night', 'noise', 'north', 'novel', 'nurse', 'occur', 'ocean', 'offer', 'often', 'onion', 'opera', 'orbit', 'order', 'organ', 'other', 'ought', 'outer', 'owner', 'paint', 'panel', 'panic', 'paper', 'party', 'pasta', 'patch', 'pause', 'peace', 'phase', 'phone', 'photo', 'piano', 'piece', 'pilot', 'pitch', 'pizza', 'place', 'plain', 'plane', 'plant', 'plate', 'plead', 'point', 'porch', 'pound', 'power', 'press', 'price', 'pride', 'prime', 'print', 'prior', 'prize', 'proof', 'proud', 'prove', 'pulse', 'punch', 'purse', 'queen', 'quest', 'quick', 'quiet', 'quite', 'quote', 'radar', 'radio', 'raise', 'rally', 'ranch', 'range', 'rapid', 'ratio', 'reach', 'react', 'ready', 'realm', 'rebel', 'refer', 'relax', 'reply', 'rider', 'ridge', 'rifle', 'right', 'risky', 'rival', 'river', 'robot', 'Roman', 'rough', 'round', 'route', 'royal', 'rumor', 'rural', 'salad', 'sales', 'sauce', 'scale', 'scare', 'scary', 'scene', 'scent', 'scope', 'score', 'screw', 'seize', 'sense', 'serve', 'seven', 'shade', 'shake', 'shall', 'shame', 'shape', 'share', 'shark', 'sharp', 'sheep', 'sheer', 'sheet', 'shelf', 'shell', 'shift', 'shine', 'shirt', 'shock', 'shoot', 'shore', 'short', 'shout', 'shove', 'shrug', 'sight', 'silly', 'since', 'sixth', 'skill', 'skirt', 'skull', 'slave', 'sleep', 'slice', 'slide', 'slope', 'small', 'smart', 'smell', 'smile', 'smoke', 'snake', 'sneak', 'solar', 'solid', 'solve', 'sorry', 'sound', 'south', 'space', 'spare', 'spark', 'speak', 'speed', 'spell', 'spend', 'spill', 'spine', 'spite', 'split', 'spoon', 'sport', 'spray', 'squad', 'stack', 'staff', 'stage', 'stair', 'stake', 'stand', 'stare', 'start', 'state', 'steak', 'steal', 'steam', 'steel', 'steep', 'steer', 'stick', 'stiff', 'still', 'stock', 'stone', 'store', 'storm', 'story', 'stove', 'straw', 'strip', 'study', 'stuff', 'style', 'sugar', 'suite', 'sunny', 'super', 'swear', 'sweat', 'sweep', 'sweet', 'swell', 'swing', 'sword', 'table', 'taste', 'teach', 'terms', 'thank', 'their', 'theme', 'there', 'these', 'thick', 'thigh', 'thing', 'think', 'third', 'those', 'three', 'throw', 'thumb', 'tight', 'tired', 'title', 'today', 'tooth', 'topic', 'total', 'touch', 'tough', 'towel', 'tower', 'toxic', 'trace', 'track', 'trade', 'trail', 'train', 'trait', 'trash', 'treat', 'trend', 'trial', 'tribe', 'trick', 'troop', 'truck', 'truly', 'trunk', 'trust', 'truth', 'tumor', 'twice', 'twist', 'uncle', 'under', 'union', 'unite', 'unity', 'until', 'upper', 'upset', 'urban', 'usual', 'valid', 'value', 'video', 'virus', 'visit', 'vital', 'vocal', 'voice', 'voter', 'wagon', 'waist', 'waste', 'watch', 'water', 'weave', 'weigh', 'weird', 'whale', 'wheat', 'wheel', 'where', 'which', 'while', 'white', 'whole', 'whose', 'widow', 'woman', 'works', 'world', 'worry', 'worth', 'would', 'wound', 'wrist', 'write', 'wrong', 'yield', 'young', 'yours', 'youth', 'FALSE', 'abroad', 'absorb', 'accent', 'accept', 'access', 'accuse', 'across', 'action', 'active', 'actual', 'adjust', 'admire', 'advice', 'advise', 'affair', 'affect', 'afford', 'afraid', 'agency', 'agenda', 'almost', 'always', 'amount', 'and/or', 'animal', 'annual', 'answer', 'anyone', 'anyway', 'appeal', 'appear', 'around', 'arrest', 'arrive', 'artist', 'asleep', 'aspect', 'assert', 'assess', 'assign', 'assist', 'assume', 'assure', 'attach', 'attack', 'attend', 'author', 'ballot', 'banana', 'banker', 'barely', 'barrel', 'basket', 'battle', 'beauty', 'become', 'before', 'behalf', 'behave', 'behind', 'belief', 'belong', 'beside', 'better', 'beyond', 'bishop', 'bitter', 'bloody', 'border', 'boring', 'borrow', 'bother', 'bottle', 'bottom', 'bounce', 'branch', 'breast', 'breath', 'breeze', 'bridge', 'bright', 'broken', 'broker', 'bronze', 'brutal', 'bubble', 'bucket', 'budget', 'bullet', 'burden', 'bureau', 'butter', 'button', 'camera', 'campus', 'cancel', 'cancer', 'candle', 'canvas', 'carbon', 'career', 'carpet', 'carrot', 'casino', 'casual', 'cattle', 'center', 'chance', 'change', 'charge', 'cheese', 'choice', 'choose', 'church', 'circle', 'client', 'clinic', 'closed', 'closer', 'closet', 'coffee', 'collar', 'colony', 'column', 'combat', 'comedy', 'coming', 'commit', 'common', 'compel', 'comply', 'convey', 'cookie', 'corner', 'costly', 'cotton', 'county', 'couple', 'course', 'cousin', 'create', 'credit', 'crisis', 'critic', 'cruise', 'custom', 'damage', 'dancer', 'danger', 'deadly', 'dealer', 'debate', 'debris', 'decade', 'decent', 'decide', 'deeply', 'defeat', 'defend', 'define', 'degree', 'demand', 'denial', 'depart', 'depend', 'depict', 'deploy', 'deputy', 'derive', 'desert', 'design', 'desire', 'detail', 'detect', 'device', 'devote', 'differ', 'dining', 'dinner', 'direct', 'divide', 'divine', 'doctor', 'domain', 'donate', 'double', 'drawer', 'driver', 'during', 'easily', 'eating', 'editor', 'effect', 'effort', 'eighth', 'either', 'eleven', 'e-mail', 'emerge', 'empire', 'employ', 'enable', 'endure', 'energy', 'engage', 'engine', 'enough', 'enroll', 'ensure', 'entire', 'entity', 'equity', 'escape', 'estate', 'ethics', 'ethnic', 'evolve', 'exceed', 'except', 'excuse', 'exotic', 'expand', 'expect', 'expert', 'export', 'expose', 'extend', 'extent', 'fabric', 'factor', 'fairly', 'family', 'famous', 'farmer', 'faster', 'father', 'fellow', 'female', 'fierce', 'figure', 'filter', 'finger', 'finish', 'firmly', 'fiscal', 'flavor', 'flight', 'flower', 'flying', 'follow', 'forbid', 'forest', 'forget', 'formal', 'format', 'former', 'foster', 'fourth', 'freely', 'freeze', 'French', 'friend', 'frozen', 'future', 'galaxy', 'garage', 'garden', 'garlic', 'gather', 'gender', 'genius', 'gentle', 'gently', 'German', 'gifted', 'glance', 'global', 'golden', 'govern', 'ground', 'growth', 'guilty', 'guitar', 'handle', 'happen', 'hardly', 'hazard', 'health', 'heaven', 'height', 'helmet', 'hidden', 'highly', 'hockey', 'honest', 'horror', 'hunger', 'hungry', 'hunter', 'ignore', 'immune', 'impact', 'import', 'impose', 'income', 'indeed', 'Indian', 'infant', 'inform', 'injure', 'injury', 'inmate', 'insect', 'insert', 'inside', 'insist', 'intact', 'intend', 'intent', 'invade', 'invent', 'invest', 'invite', 'island', 'itself', 'jacket', 'Jewish', 'jungle', 'junior', 'killer', 'Korean', 'ladder', 'lately', 'latter', 'launch', 'lawyer', 'leader', 'league', 'legacy', 'legend', 'length', 'lesson', 'letter', 'likely', 'liquid', 'listen', 'little', 'living', 'locate', 'lonely', 'lovely', 'mainly', 'makeup', 'manage', 'manner', 'marble', 'margin', 'marine', 'marker', 'market', 'master', 'matter', 'medium', 'member', 'memory', 'mental', 'mentor', 'merely', 'method', 'middle', 'minute', 'mirror', 'mm-hmm', 'mobile', 'modern', 'modest', 'modify', 'moment', 'monkey', 'mostly', 'mother', 'motion', 'motive', 'murder', 'muscle', 'museum', 'Muslim', 'mutter', 'mutual', 'myself', 'narrow', 'nation', 'native', 'nature', 'nearby', 'nearly', 'needle', 'nobody', 'normal', 'notice', 'notion', 'number', 'object', 'obtain', 'occupy', 'office', 'online', 'openly', 'oppose', 'option', 'orange', 'origin', 'others', 'outfit', 'outlet', 'output', 'oxygen', 'palace', 'parade', 'parent', 'parish', 'partly', 'pastor', 'patent', 'patrol', 'patron', 'peanut', 'pencil', 'people', 'pepper', 'period', 'permit', 'person', 'phrase', 'pickup', 'pillow', 'planet', 'player', 'please', 'plenty', 'plunge', 'pocket', 'poetry', 'police', 'policy', 'poster', 'potato', 'powder', 'praise', 'prayer', 'preach', 'prefer', 'pretty', 'priest', 'prison', 'profit', 'prompt', 'proper', 'public', 'punish', 'purple', 'pursue', 'puzzle', 'rabbit', 'racial', 'racism', 'random', 'rarely', 'rather', 'rating', 'reader', 'really', 'reason', 'recall', 'recent', 'recipe', 'record', 'reduce', 'reform', 'refuge', 'refuse', 'regain', 'regard', 'regime', 'region', 'regret', 'reject', 'relate', 'relief', 'remain', 'remark', 'remind', 'remote', 'remove', 'render', 'rental', 'repair', 'repeat', 'report', 'rescue', 'resign', 'resist', 'resort', 'result', 'resume', 'retail', 'retain', 'retire', 'return', 'reveal', 'review', 'reward', 'rhythm', 'ribbon', 'ritual', 'rocket', 'rubber', 'ruling', 'runner', 'sacred', 'safely', 'safety', 'salary', 'salmon', 'sample', 'saving', 'scared', 'scheme', 'school', 'scream', 'screen', 'script', 'search', 'season', 'second', 'secret', 'sector', 'secure', 'seldom', 'select', 'seller', 'Senate', 'senior', 'series', 'settle', 'severe', 'sexual', 'shadow', 'shared', 'shorts', 'should', 'shower', 'shrimp', 'shrink', 'signal', 'silent', 'silver', 'simple', 'simply', 'singer', 'single', 'sister', 'sleeve', 'slight', 'slowly', 'smooth', 'soccer', 'social', 'sodium', 'soften', 'softly', 'solely', 'source', 'Soviet', 'speech', 'sphere', 'spirit', 'spouse', 'spread', 'spring', 'square', 'stable', 'stance', 'statue', 'status', 'steady', 'strain', 'streak', 'stream', 'street', 'stress', 'strict', 'strike', 'string', 'stroke', 'strong', 'studio', 'stupid', 'submit', 'subtle', 'suburb', 'sudden', 'suffer', 'summer', 'summit', 'supply', 'surely', 'survey', 'switch', 'symbol', 'system', 'tackle', 'tactic', 'talent', 'target', 'temple', 'tender', 'tennis', 'terror', 'thanks', 'theory', 'thirty', 'though', 'thread', 'threat', 'thrive', 'throat', 'ticket', 'timber', 'timing', 'tissue', 'toilet', 'tomato', 'tongue', 'toward', 'tragic', 'trauma', 'travel', 'treaty', 'tribal', 'tunnel', 'turkey', 'twelve', 'twenty', 'unable', 'unfair', 'unfold', 'unique', 'United', 'unless', 'unlike', 'update', 'useful', 'vacuum', 'valley', 'vanish', 'vendor', 'verbal', 'versus', 'vessel', 'victim', 'viewer', 'virtue', 'vision', 'visual', 'volume', 'voting', 'wander', 'warmth', 'weaken', 'wealth', 'weapon', 'weekly', 'weight', 'widely', 'window', 'winner', 'winter', 'wisdom', 'within', 'wonder', 'wooden', 'worker', 'writer', 'yellow'
];

let randomIndex = Math.floor(Math.random() * wordList.length)
let secret = wordList[randomIndex]
console.log(secret);

let currentAttempt = ''
let history = []
let numAttempts = secret.length + 1;
console.log(numAttempts);

let grid = document.getElementById('grid')
buildGrid()
updateGrid()
window.addEventListener('keydown', handleKeyDown)

function handleKeyDown(e) {
    let letter = e.key.toLowerCase()
    if (letter === 'enter') {
        if (currentAttempt.length < secret.length) {
            return
        }
        if (!wordList.includes(currentAttempt)) {
            let cell = document.getElementById('error');
            cell.innerHTML = 'Not in word list';
            cell.style.animation = "fadeinout 4s linear forwards";
            setTimeout(function() {
                cell.style.animation = null
            }, 3000)
            return
        }
        history.push(currentAttempt);
        checkWin()
    } else if (letter === 'backspace') {
        currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1)
    } else if (/[a-z]/.test(letter)) {
        if (currentAttempt.length < secret.length) {
            currentAttempt += letter
        }
    }
    updateGrid()
}

function buildGrid() {
    for (let i = 0; i < secret.length + 1; i++) {
        let row = document.createElement('div')
        for (let j = 0; j < secret.length; j++) {
            let cell = document.createElement('div')
            cell.className = 'cell'
            cell.innerHTML = '<div style="opacity: 0">X</div>'
            row.appendChild(cell)
        }
        grid.appendChild(row)

    }
}

function checkWin() {
    numAttempts = numAttempts - 1;
    console.log(numAttempts);
    if (currentAttempt === secret) {
        console.log("Win!");
        let cell = document.getElementById('error');
        cell.innerHTML = 'You Win!';
        cell.classList.toggle('elementToFadeIn');
        currentAttempt = ''
        window.removeEventListener('keydown', handleKeyDown)
        return
    } else {
        if (numAttempts === 0) {
            console.log('you lose');
            window.removeEventListener('keydown', handleKeyDown)
            return
        } else {
            console.log("Try again");
            currentAttempt = ''
            return
        }
    }

}

function updateGrid() {
    let row = grid.firstChild
    for (let attempt of history) {
        drawAttempt(row, attempt, false)
        row = row.nextSibling
    }
    drawAttempt(row, currentAttempt, true)
}

function drawAttempt(row, attempt, isCurrent) {

    for (let i = 0; i < secret.length; i++) {
        let cell = row.children[i];
        if (attempt[i] !== undefined) {
            cell.textContent = attempt[i]
        } else {
            // lol
            cell.innerHTML = '<div style="opacity: 0">X</div>'
        }
        if (isCurrent) {
            cell.style.backgroundColor = 'var(--color-background)';
        } else {
            cell.style.backgroundColor = getBgColor(attempt, i);
            cell.style.color = 'var(--color-tone-7)'
            cell.style.borderColor = getBgColor(attempt, i);
        }
    }


}

function getBgColor(attempt, i) {
    let correctLetter = secret[i]
    let attemptLetter = attempt[i]
    if (
        attemptLetter === undefined ||
        secret.indexOf(attemptLetter) === -1
    ) {
        return 'var(--color-tone-2)'
    }
    if (correctLetter === attemptLetter) {
        return '#538d4e'
    }
    return '#b59f3b'
}

const switchButton = document.getElementById('switch');


switchButton.addEventListener('click', () => {
    document.body.classList.toggle('dark'); //toggle the HTML body the class 'dark'
    switchButton.classList.toggle('active'); //toggle the HTML button with the id='switch' with the class 'active''

    if (document.body.classList.contains('dark')) { //when the body has the class 'dark' currently
        localStorage.setItem('darkMode', 'enabled'); //store this data if dark mode is on
    } else {
        localStorage.setItem('darkMode', 'disabled'); //store this data if dark mode is off
    }
});

if (localStorage.getItem('darkMode') == 'enabled') {
    document.body.classList.toggle('dark');
    switchButton.classList.toggle('active');

}