import { type FC } from "react";
import CodeDiffViewer from "./CodeDiffViewer";

interface ChangesPanelProps {
  fileName?: string;
  additions?: number;
  deletions?: number;
}

const ChangesPanel: FC<ChangesPanelProps> = ({
  fileName = "src/auth/OAuthService.js",
  additions = 20,
  deletions = 1,
}) => {
  return (
    <CodeDiffViewer
      fileName={fileName}
      additions={additions}
      deletions={deletions}
      lines={[
        {
          number: 1,
          type: "context",
          content: "import { HttpClient } from '../utils/http';",
        },
        {
          number: 2,
          type: "context",
          content: "",
        },
        {
          number: 3,
          type: "context",
          content: "import { Logger } from '../utils/logger';",
        },
        {
          number: 4,
          type: "context",
          content: "",
        },
        {
          number: 5,
          type: "added",
          content: "+ import { TokenManager } from './TokenManager';",
        },
        {
          number: 6,
          type: "added",
          content: "+ import { OAuthConfig } from '../config/oauth.config';",
          suggestion: {
            title: "Sugestão",
            description:
              "Considere usar injeção de dependência para TokenManager ao invés de instanciar diretamente no construtor. Isso facilitará os testes unitários.",
          },
        },
        {
          number: 7,
          type: "context",
          content: "",
        },
        {
          number: 8,
          type: "context",
          content: "export class OAuthService {",
        },
        {
          number: 9,
          type: "context",
          content: "",
        },
        {
          number: 10,
          type: "removed",
          content: "- constructor(config) {",
        },
        {
          number: 11,
          type: "added",
          content: "+ constructor() {",
        },
        {
          number: 12,
          type: "added",
          content: "+   const config = OAuthConfig.getInstance();",
        },
        {
          number: 13,
          type: "context",
          content: "  this.clientId = config.clientId;",
        },
        {
          number: 14,
          type: "context",
          content: "  this.clientSecret = config.clientSecret;",
        },
        {
          number: 15,
          type: "added",
          content: "+   this.tokenManager = new TokenManager();",
        },
        {
          number: 16,
          type: "context",
          content: "}",
        },
        {
          number: 17,
          type: "context",
          content: "",
        },
        {
          number: 18,
          type: "context",
          content: "async authenticate(code) {",
        },
      ]}
    />
  );
};

export default ChangesPanel;
