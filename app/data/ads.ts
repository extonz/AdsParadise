export type AdEffect =
  | "productivity"
  | "lottery"
  | "pencil"
  | "ram"
  | "cat"
  | "nothing-subscription"
  | "premium-air"
  | "zero-cost"
  | "ad-social"
  | "sleep"
  | "rock"
  | "computer-scan"
  | "celebrity"
  | "premium-nothing"
  | "stop-scroll"
  | "internet-misses"
  | "rich"
  | "meta-ad"
  | "second-internet"
  | "celebration"
  | "wifi"
  | "millionaire"
  | "chair"
  | "speed"
  | "mouse"
  | "ai"
  | "height"
  | "pixel"
  | "unlock"
  | "secret"
  | "button"
  | "free-nothing"
  | "oxygen"
  | "busy"
  | "ceo"
  | "weird-trick"
  | "surprise"
  | "insurance"
  | "guaranteed-nothing"
  | "rectangle"
  | "browser"
  | "reality"
  | "tabs"
  | "money-generator"
  | "premium-plus"
  | "stop-ads"
  | "millionth"
  | "download-internet"
  | "absolute-nothing"
  | "final";

export type FakeAd = {
  id: number;
  title: string;
  description: string;
  button: string;
  category: string;
  size: "small" | "medium" | "large";
  effect: AdEffect;
};

export const fakeAds: FakeAd[] = [
  {
    id: 1,
    title: "BECOME 37% MORE PRODUCTIVE",
    description:
      "Our revolutionary productivity system does absolutely nothing.",
    button: "LEARN MORE",
    category: "productivity",
    size: "large",
    effect: "productivity",
  },
  {
    id: 2,
    title: "YOU HAVE WON €4,827,391",
    description:
      "Congratulations! You probably haven't, but it's worth checking.",
    button: "CLAIM NOW",
    category: "prize",
    size: "medium",
    effect: "lottery",
  },
  {
    id: 3,
    title: "BUY INVISIBLE PENCILS",
    description:
      "Write things without anyone knowing you're writing.",
    button: "SHOP NOW",
    category: "shopping",
    size: "medium",
    effect: "pencil",
  },
  {
    id: 4,
    title: "DOWNLOAD MORE RAM",
    description:
      "Your computer has been feeling a little empty lately.",
    button: "DOWNLOAD",
    category: "technology",
    size: "large",
    effect: "ram",
  },
  {
    id: 5,
    title: "YOUR CAT HAS BEEN SELECTED",
    description:
      "A highly exclusive opportunity is waiting for your cat.",
    button: "VIEW OFFER",
    category: "animals",
    size: "medium",
    effect: "cat",
  },
  {
    id: 6,
    title: "SUBSCRIBE TO NOTHING",
    description:
      "Receive absolutely nothing, delivered directly to your inbox.",
    button: "SUBSCRIBE",
    category: "subscription",
    size: "small",
    effect: "nothing-subscription",
  },
  {
    id: 7,
    title: "PREMIUM AIR",
    description:
      "Fresh air. Professionally packaged. €49.99 per breath.",
    button: "BUY AIR",
    category: "luxury",
    size: "large",
    effect: "premium-air",
  },
  {
    id: 8,
    title: "THIS AD COST US €0",
    description:
      "And somehow you're still reading it.",
    button: "CONTINUE",
    category: "meta",
    size: "small",
    effect: "zero-cost",
  },
  {
    id: 9,
    title: "MEET PEOPLE WHO ALSO LIKE ADS",
    description:
      "There are probably at least three of them.",
    button: "MEET THEM",
    category: "social",
    size: "medium",
    effect: "ad-social",
  },
  {
    id: 10,
    title: "FIX YOUR SLEEP SCHEDULE",
    description:
      "Step one: stop looking at advertisements at 3 AM.",
    button: "FIX IT",
    category: "lifestyle",
    size: "large",
    effect: "sleep",
  },
  {
    id: 11,
    title: "BUY A ROCK",
    description:
      "It's a rock. It's €49.99. It is also surprisingly popular.",
    button: "BUY ROCK",
    category: "shopping",
    size: "medium",
    effect: "rock",
  },
  {
    id: 12,
    title: "YOUR COMPUTER IS PROBABLY FINE",
    description:
      "But wouldn't you like to check anyway?",
    button: "SCAN NOW",
    category: "technology",
    size: "small",
    effect: "computer-scan",
  },
  {
    id: 13,
    title: "BECOME AN INTERNET CELEBRITY",
    description:
      "Step one: create an account. Step two: regret everything.",
    button: "BECOME FAMOUS",
    category: "social",
    size: "large",
    effect: "celebrity",
  },
  {
    id: 14,
    title: "PREMIUM NOTHING™",
    description:
      "Nothing, but better. Now with absolutely zero features.",
    button: "UPGRADE",
    category: "premium",
    size: "medium",
    effect: "premium-nothing",
  },
  {
    id: 15,
    title: "STOP SCROLLING",
    description:
      "This advertisement has personally requested that you stop.",
    button: "KEEP SCROLLING",
    category: "meta",
    size: "small",
    effect: "stop-scroll",
  },
  {
    id: 16,
    title: "THE INTERNET MISSES YOU",
    description:
      "You haven't bought anything in almost five minutes.",
    button: "RETURN",
    category: "meta",
    size: "medium",
    effect: "internet-misses",
  },
  {
    id: 17,
    title: "GET RICH QUICK",
    description:
      "Step one: become rich. Step two: enjoy being rich.",
    button: "START",
    category: "money",
    size: "large",
    effect: "rich",
  },
  {
    id: 18,
    title: "YOU ARE CURRENTLY VIEWING AN AD",
    description:
      "Thank you for your attention.",
    button: "OK",
    category: "meta",
    size: "small",
    effect: "meta-ad",
  },
  {
    id: 19,
    title: "BUY A SECOND INTERNET",
    description:
      "For when one internet simply isn't enough.",
    button: "GET INTERNET",
    category: "technology",
    size: "large",
    effect: "second-internet",
  },
  {
    id: 20,
    title: "CONGRATULATIONS",
    description:
      "You have successfully reached another advertisement.",
    button: "CELEBRATE",
    category: "meta",
    size: "medium",
    effect: "celebration",
  },
  {
    id: 21,
    title: "FREE WI-FI",
    description:
      "The password is probably written somewhere nearby.",
    button: "GET PASSWORD",
    category: "technology",
    size: "medium",
    effect: "wifi",
  },
  {
    id: 22,
    title: "BECOME A MILLIONAIRE",
    description:
      "Our calculator says you're only €999,999 away.",
    button: "CALCULATE",
    category: "money",
    size: "large",
    effect: "millionaire",
  },
  {
    id: 23,
    title: "INVISIBLE CHAIR",
    description:
      "Sit anywhere. Nobody will ever know.",
    button: "BUY CHAIR",
    category: "shopping",
    size: "medium",
    effect: "chair",
  },
  {
    id: 24,
    title: "200% FASTER INTERNET",
    description:
      "Scientifically questionable. Emotionally convincing.",
    button: "TEST SPEED",
    category: "technology",
    size: "large",
    effect: "speed",
  },
  {
    id: 25,
    title: "YOUR MOUSE IS TIRED",
    description:
      "It has clicked hundreds of advertisements today.",
    button: "REST MOUSE",
    category: "technology",
    size: "small",
    effect: "mouse",
  },
  {
    id: 26,
    title: "AI THAT DOES ABSOLUTELY NOTHING",
    description:
      "Finally, artificial intelligence that understands you.",
    button: "ASK AI",
    category: "technology",
    size: "large",
    effect: "ai",
  },
  {
    id: 27,
    title: "BECOME 12% TALLER",
    description:
      "Results may vary. Height may remain unchanged.",
    button: "GET TALLER",
    category: "lifestyle",
    size: "medium",
    effect: "height",
  },
  {
    id: 28,
    title: "FREE PIXEL",
    description:
      "One completely free pixel for your digital life.",
    button: "CLAIM PIXEL",
    category: "technology",
    size: "small",
    effect: "pixel",
  },
  {
    id: 29,
    title: "UNLOCK THE WEBSITE",
    description:
      "Apparently the website was locked this entire time.",
    button: "UNLOCK",
    category: "meta",
    size: "medium",
    effect: "unlock",
  },
  {
    id: 30,
    title: "SECRET ADVERTISEMENT",
    description:
      "You weren't supposed to find this.",
    button: "OPEN SECRET",
    category: "secret",
    size: "large",
    effect: "secret",
  },
  {
    id: 31,
    title: "WORLD'S BEST BUTTON",
    description:
      "Experts agree that this is definitely a button.",
    button: "CLICK BUTTON",
    category: "meta",
    size: "medium",
    effect: "button",
  },
  {
    id: 32,
    title: "FREE NOTHING",
    description:
      "Claim your completely free quantity of nothing.",
    button: "CLAIM NOTHING",
    category: "shopping",
    size: "small",
    effect: "free-nothing",
  },
  {
    id: 33,
    title: "PREMIUM OXYGEN",
    description:
      "The same oxygen, but with a premium label.",
    button: "BREATHE PREMIUM",
    category: "luxury",
    size: "large",
    effect: "oxygen",
  },
  {
    id: 34,
    title: "YOU LOOK BUSY",
    description:
      "Pretend you're working by opening this advertisement.",
    button: "LOOK BUSY",
    category: "productivity",
    size: "medium",
    effect: "busy",
  },
  {
    id: 35,
    title: "BECOME A CEO",
    description:
      "Print your very own completely unofficial CEO certificate.",
    button: "BECOME CEO",
    category: "business",
    size: "large",
    effect: "ceo",
  },
  {
    id: 36,
    title: "ONE WEIRD TRICK",
    description:
      "Scientists hate this advertisement.",
    button: "SEE TRICK",
    category: "clickbait",
    size: "medium",
    effect: "weird-trick",
  },
  {
    id: 37,
    title: "CLICK FOR A SURPRISE",
    description:
      "We promise absolutely nothing about the surprise.",
    button: "SURPRISE ME",
    category: "mystery",
    size: "large",
    effect: "surprise",
  },
  {
    id: 38,
    title: "INTERNET INSURANCE",
    description:
      "Protect yourself against absolutely nothing.",
    button: "GET COVER",
    category: "business",
    size: "medium",
    effect: "insurance",
  },
  {
    id: 39,
    title: "100% GUARANTEED NOTHING",
    description:
      "Our guarantee is completely guaranteed.",
    button: "GUARANTEE IT",
    category: "meta",
    size: "small",
    effect: "guaranteed-nothing",
  },
  {
    id: 40,
    title: "BUY THIS RECTANGLE",
    description:
      "It's a rectangle. What more could you possibly want?",
    button: "BUY RECTANGLE",
    category: "shopping",
    size: "large",
    effect: "rectangle",
  },
  {
    id: 41,
    title: "YOUR BROWSER IS HUNGRY",
    description:
      "Feed it one advertisement to keep it happy.",
    button: "FEED BROWSER",
    category: "technology",
    size: "medium",
    effect: "browser",
  },
  {
    id: 42,
    title: "UPGRADE YOUR REALITY",
    description:
      "Reality 2.0 is currently unavailable.",
    button: "UPGRADE",
    category: "technology",
    size: "large",
    effect: "reality",
  },
  {
    id: 43,
    title: "GET MORE TABS",
    description:
      "Because apparently you don't have enough already.",
    button: "GET TABS",
    category: "technology",
    size: "medium",
    effect: "tabs",
  },
  {
    id: 44,
    title: "FREE MONEY GENERATOR",
    description:
      "It generates exactly €0.00 per minute.",
    button: "GENERATE MONEY",
    category: "money",
    size: "large",
    effect: "money-generator",
  },
  {
    id: 45,
    title: "ADVERTISEMENT PREMIUM PLUS",
    description:
      "Experience advertisements at an unnecessarily premium level.",
    button: "UPGRADE",
    category: "premium",
    size: "medium",
    effect: "premium-plus",
  },
  {
    id: 46,
    title: "STOP ADS",
    description:
      "Click here to temporarily stop seeing advertisements.",
    button: "STOP ADS",
    category: "meta",
    size: "large",
    effect: "stop-ads",
  },
  {
    id: 47,
    title: "YOU ARE OUR 1,000,000TH VISITOR",
    description:
      "This is definitely not suspicious.",
    button: "CELEBRATE",
    category: "prize",
    size: "large",
    effect: "millionth",
  },
  {
    id: 48,
    title: "DOWNLOAD THE INTERNET",
    description:
      "The entire internet. One convenient download.",
    button: "DOWNLOAD",
    category: "technology",
    size: "large",
    effect: "download-internet",
  },
  {
    id: 49,
    title: "CLICK HERE FOR ABSOLUTELY NOTHING",
    description:
      "Seriously. Nothing will happen.",
    button: "DO NOTHING",
    category: "meta",
    size: "small",
    effect: "absolute-nothing",
  },
  {
    id: 50,
    title: "THE FINAL ADVERTISEMENT",
    description:
      "You have reached what may or may not be the final advertisement.",
    button: "FINISH",
    category: "ending",
    size: "large",
    effect: "final",
  },
];