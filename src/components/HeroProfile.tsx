import { motion } from "framer-motion";
import { Download, Code2, Bot } from "lucide-react";
import discordIdle from "@/assets/discord-idle.svg";
import badgeEarlyDev from "@/assets/badges/early-verified-bot-developer.svg";
import badgeEarlySupporter from "@/assets/badges/early-supporter.svg";
import badgeNitro from "@/assets/badges/nitro.svg";
import badgeBooster from "@/assets/badges/boost-24-month.svg";
import badgeActiveDev from "@/assets/badges/active-developer.svg";
import badgeHypesquad from "@/assets/badges/balance.svg";
import badgeBugHunter from "@/assets/badges/bug-hunter-lv1.svg";
import badgeModerator from "@/assets/badges/discord-certified-moderator.svg";

const badges = [
  { src: badgeEarlyDev, label: "Early Verified Bot Developer" },
  { src: badgeEarlySupporter, label: "Early Supporter" },
  { src: badgeNitro, label: "Nitro" },
  { src: badgeBooster, label: "Booster" },
  { src: badgeActiveDev, label: "Active Developer" },
  { src: badgeHypesquad, label: "Hypesquad" },
  { src: badgeBugHunter, label: "Bug Hunter" },
  { src: badgeModerator, label: "Moderator" },
];

const avatarWithDeco = "/avatar.gif";

const HeroProfile = () => {
  return (
    <motion.div
      className="glass rounded-2xl p-6 lg:p-8 flex-1"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row items-start gap-6">
        {/* Avatar with Discord decoration */}
        <div className="relative w-28 h-28">
          <img
            src={avatarWithDeco}
            alt="Avatar with Decoration"
            className="w-full h-full object-contain"
          />
          <img src={discordIdle} alt="Idle" className="absolute bottom-0.5 right-0.5 w-5 h-5 z-20" title="Idle" />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-foreground">々 Ꮪɪɴɢʟᴇʙᴏʏ</h1>
          <p className="text-muted-foreground font-mono text-sm">@single.4008</p>

          {/* Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3 p-2 rounded-xl bg-secondary/50">
            {badges.map((badge, i) => (
              <motion.div
                key={i}
                className="cursor-pointer transition-transform hover:scale-125"
                title={badge.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05 }}
              >
                <img src={badge.src} alt={badge.label} className="w-6 h-6" />
              </motion.div>
            ))}
          </div>

          {/* Roles */}
          <div className="mt-4 space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code2 size={14} className="text-primary" />
              <span>Fullstack Developer</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bot size={14} className="text-primary" />
              <span>Freelancing and Web Development</span>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
            Hi, I'm SingleBoy. A developer focusing on Freelancing and Web Development. I enjoy exploring new technologies!
          </p>

          {/* Download CV */}
          <motion.button
            className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-purple text-primary-foreground text-sm font-medium transition-all hover:shadow-glow-strong"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download size={16} />
            Download CV
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroProfile;
