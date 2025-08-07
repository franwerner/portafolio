import ApiSVG from "@/svg/tech/Api.svg";
import BootstrapSVG from "@/svg/tech/Bootstrap.svg";
import CCS3SVG from "@/svg/tech/CSS3.svg";
import ExpoSVG from "@/svg/tech/Expo.svg";
import Express from "@/svg/tech/Express.svg";
import FastApiSVG from "@/svg/tech/FastApi.svg";
import FramerMotionSVG from "@/svg/tech/FramerMotion.svg";
import HeroUiSVG from "@/svg/tech/HeroUI.svg";
import HTML5SVG from "@/svg/tech/Html5.svg";
import JsSVG from "@/svg/tech/Js.svg";
import JwtSVG from "@/svg/tech/Jwt.svg";
import MySQlSVG from "@/svg/tech/MySql.svg";
import NativewindSVG from "@/svg/tech/Nativewind.svg";
import NetlifySVG from "@/svg/tech/Netlify.svg";
import NextJsSVG from "@/svg/tech/NextJs.svg";
import NodeJsSVG from "@/svg/tech/NodeJsSVG.svg";
import PreactSVG from "@/svg/tech/Preact.svg";
import PySvg from "@/svg/tech/Py.svg";
import RailwaySVG from "@/svg/tech/Railway.svg";
import ReactSVG from "@/svg/tech/React.svg";
import ReactNativeSVG from "@/svg/tech/ReactNative.svg";
import ReactRouterSVG from "@/svg/tech/ReactRouter.svg";
import ReduxSVG from "@/svg/tech/Redux.svg";
import Sequealize from "@/svg/tech/Sequealize.svg";
import SqlSVG from "@/svg/tech/Sql.svg";
import Sqlite from "@/svg/tech/SqlLIte.svg";
import TailwindSVG from "@/svg/tech/Tailwindcss.svg";
import TsSVG from "@/svg/tech/Ts.svg";
import VercelSVG from "@/svg/tech/Vercel.svg";
import ViteSVG from "@/svg/tech/Vite.svg";
import WebSocketSVG from "@/svg/tech/WebSocket.svg";

export interface Technology {
    name: string;
    level: number; // 1-5 stars
    Icon: React.FC<React.SVGProps<SVGSVGElement>>
}

type Technologies = Array<Technology>

const languagesTech: Technologies = [
    {
        name: "Javascript",
        Icon: JsSVG,
        level: 5,
    },
    {
        name: "Typescript",
        Icon: TsSVG,
        level: 5,
    },
    {
        name: "Python",
        Icon: PySvg,
        level: 2
    },
    {
        name: "SQL",
        Icon: SqlSVG,
        level: 4
    }
]

const frontendTech: Technologies = [
    {
        name: "HTML 5",
        Icon: HTML5SVG,
        level: 5
    },
    {
        name: "CSS 3",
        Icon: CCS3SVG,
        level: 4
    },
    {
        name: "React",
        Icon: ReactSVG,
        level: 5
    },
    {
        name: "Vite",
        Icon: ViteSVG,
        level: 3
    }, {
        name: "NextJS",
        Icon: NextJsSVG,
        level: 3
    },
    {
        name: "Preact",
        Icon: PreactSVG,
        level: 4
    },
    {
        name: "TailwindCSS",
        Icon: TailwindSVG,
        level: 4
    },
    {
        name: "Bootstrap 5",
        Icon: BootstrapSVG,
        level: 4
    },
    {
        name: "HeroUI",
        Icon: HeroUiSVG,
        level: 5
    },
    {
        name: "Redux",
        Icon: ReduxSVG,
        level: 4
    },
    {
        name: "React Router",
        Icon: ReactRouterSVG,
        level: 3
    },
    {
        name: "Framer motion",
        Icon: FramerMotionSVG,
        level: 3
    }
]

const mobileTech: Technologies = [
    {
        name: "React Native",
        Icon: ReactNativeSVG,
        level: 3
    },
    {
        name: "Expo",
        Icon: ExpoSVG,
        level: 3
    },
    {
        name: "Nativewind",
        Icon: NativewindSVG,
        level: 4
    }
]

const backendTech: Technologies = [
    {
        name: "NodeJS",
        Icon: NodeJsSVG,
        level: 4
    },
    {
        name: "ExpressJS",
        Icon: Express,
        level: 5
    },
    {
        name: "Web Socket",
        Icon: WebSocketSVG,
        level: 2
    },
    {
        name: "JWT",
        Icon: JwtSVG,
        level: 5
    },
    {
        name: "Api REST",
        Icon: ApiSVG,
        level: 5
    },
    {
        name: "FastAPI",
        Icon: FastApiSVG,
        level: 2
    }
]

const databaseTech: Technologies = [
    {
        name: "MySQL",
        Icon: MySQlSVG,
        level: 4
    },
    {
        name: "SQL Lite",
        Icon: Sqlite,
        level: 3
    }
]


const devOpsTech: Technologies = [
    {
        name: "Vercel",
        Icon: VercelSVG,
        level: 2
    },
    {
        name: "Netlify",
        Icon: NetlifySVG,
        level: 2
    },
    {
        name: "Railway",
        Icon: RailwaySVG,
        level: 4
    }

]

    ;[
        languagesTech,
        frontendTech,
        backendTech,
        devOpsTech,
        databaseTech,
        mobileTech
    ].forEach((arr) => arr.sort((a, b) => b.level - a.level))

export { backendTech, databaseTech, devOpsTech, frontendTech, languagesTech, mobileTech };

