interface GoogleIdCallbackResponse {
  credential: string;
}

interface GoogleIdConfiguration {
  client_id: string;
  callback: (response: GoogleIdCallbackResponse) => void;
}

interface GoogleId {
  initialize(config: GoogleIdConfiguration): void;
  prompt(callback?: (notification: any) => void): void;
}

interface GoogleAccounts {
  id: GoogleId;
}

interface GoogleGlobal {
  accounts: GoogleAccounts;
}

interface Window {
  google?: GoogleGlobal;
}


