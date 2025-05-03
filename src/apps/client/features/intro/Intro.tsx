import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
// import Snowfall from "react-snowfall";
import { FC } from "react";
import { IntroType } from "./types";

const Intro: FC<IntroType> = ({ data }) => {
  return (
    <div className="container container-sm">
      <div className="intro-page">
        <div className="snowFall"></div>
        <img src={data && data?.background_photo} loading="lazy" className="img" alt="img" />
        <div className="opacity-block" />
        <div className="img_log">
          <img src={data?.logo} className="img_logo" alt="logo" />
        </div>
      </div>
      {/* <Snowfall color="white" snowflakeCount={100} /> */}

      <div className="mt-4 ">
        <div className="name_container">
          <h1 className="texts">{data?.name}</h1>
          <p className="texts">{data?.address}</p>

          <div>
            {data?.instagram_link && (
              <a
                href={data?.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "black" }}
              >
                <InstagramIcon style={{ marginRight: 5 }} />
              </a>
            )}
            {data?.telegram_link && (
              <a
                style={{ textDecoration: "none", color: "black" }}
                href={data.telegram_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TelegramIcon style={{ marginRight: 5 }} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
