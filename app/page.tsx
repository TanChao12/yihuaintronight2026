"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const schedule = [
  ["19:30", "报道", "REGISTRATION", "抵达、签到，领取你的新生旅程。"],
  ["19:45", "开场", "OPENING", "让今晚，从第一束光开始。"],
  ["19:50", "毅华宿舍村介绍", "KPZ VILLAGE", "认识我们共同生活的地方。"],
  ["20:00", "25/26 毅华理事会介绍", "COUNCIL / RECRUITMENT", "认识团队，也发现下一段可能。"],
  ["20:10", "破冰游戏", "ICE BREAKING", "从陌生，到一句话的开始。"],
  ["20:25", "游戏环节", "PLAY TOGETHER", "把名字变成故事，把故事变成回忆。"],
  ["20:50", "惩罚环节", "PENALTY", "今晚的笑声，由你决定。"],
  ["21:00", "Senior 分享", "SENIOR SHARING", "听听已经走过这段路的人。"],
  ["21:10", "Q&A Session", "QUESTIONS", "把你的疑问，留在今晚。"],
  ["21:20", "Closing · 活动反馈", "CLOSING", "写下你的第一份新生记忆。"],
  ["21:30", "大合照", "ONE FRAME", "30 个陌生人，成为一张照片里的我们。"],
];

const experiences = [
  { n: "01", cn: "破冰", en: "BREAK THE ICE", copy: "一场游戏，一句自我介绍，一个新的名字。" },
  { n: "02", cn: "共玩", en: "PLAY AS ONE", copy: "没有观众。今晚，每个人都是故事的一部分。" },
  { n: "03", cn: "分享", en: "PASS IT ON", copy: "从学长姐的经验里，看见自己的下一步。" },
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: true });
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const q = gsap.utils.selector(root);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      q(".reveal").forEach((el) => gsap.set(el, { opacity: 1, y: 0, clipPath: "inset(0 0 0 0)" }));
      q(".loader").forEach((el) => gsap.set(el, { display: "none" }));
      return;
    }

    const loader = q(".loader");
    const loaderLine = q(".loader-line");
    const loaderGlyph = q(".loader-glyph");
    const loaderName = q(".loader-name");
    const heroWords = q(".hero-word");
    const heroMeta = q(".hero-meta");

    const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
    intro.to(loaderLine, { scaleX: 1, duration: 1.25 })
      .to(loaderGlyph, { opacity: 1, y: 0, duration: 0.8 }, "-=0.55")
      .to(loaderName, { opacity: 1, y: 0, duration: 0.8 }, "-=0.4")
      .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 1.15, delay: 0.35, ease: "power4.inOut" })
      .from(heroWords, { yPercent: 115, opacity: 0, stagger: 0.09, duration: 1.15 }, "-=0.55")
      .from(heroMeta, { y: 24, opacity: 0, duration: 0.8 }, "-=0.7");

    gsap.to(q(".hero-sigil"), { rotate: 360, duration: 50, repeat: -1, ease: "none" });
    gsap.to(q(".hero-orbit"), { rotate: -360, duration: 28, repeat: -1, ease: "none" });
    gsap.to(q(".hero-dragon"), { y: -22, x: 12, duration: 5.5, repeat: -1, yoyo: true, ease: "sine.inOut" });

    gsap.to(q(".hero-poster"), {
      yPercent: -13,
      scale: 1.08,
      rotate: 1.5,
      scrollTrigger: { trigger: q(".hero"), start: "top top", end: "bottom top", scrub: 1.2 },
    });
    gsap.to(q(".hero-title"), {
      yPercent: 36,
      opacity: 0.1,
      scrollTrigger: { trigger: q(".hero"), start: "top top", end: "bottom top", scrub: true },
    });

    q(".reveal").forEach((el) => {
      gsap.fromTo(el, { y: 55, opacity: 0, clipPath: "inset(0 0 100% 0)" }, {
        y: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.05, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true },
      });
    });

    q(".story-stage").forEach((stage) => {
      const lines = stage.querySelectorAll(".story-line");
      gsap.from(lines, {
        yPercent: 120,
        opacity: 0,
        stagger: 0.13,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: stage, start: "top 70%", end: "bottom 35%", toggleActions: "play none none reverse" },
      });
    });

    const storyRing = q(".story-ring")[0];
    if (storyRing) {
      gsap.to(storyRing, {
        rotate: 180,
        scrollTrigger: { trigger: q(".story"), start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }

    const dateNumbers = q(".date-number");
    gsap.from(dateNumbers, {
      yPercent: 110,
      stagger: 0.12,
      duration: 1.15,
      ease: "power4.out",
      scrollTrigger: { trigger: q(".date-section"), start: "top 72%", once: true },
    });

    const timelineItems = q(".timeline-item");
    timelineItems.forEach((item, i) => {
      gsap.from(item, {
        y: 42,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.02,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 88%", once: true },
      });
    });

    gsap.to(q(".timeline-progress"), {
      scaleY: 1,
      transformOrigin: "top",
      ease: "none",
      scrollTrigger: { trigger: q(".timeline"), start: "top 55%", end: "bottom 70%", scrub: true },
    });

    q(".experience-card").forEach((card) => {
      const media = card.querySelector(".card-media");
      card.addEventListener("mouseenter", () => gsap.to(media, { scale: 1.12, duration: 0.7, ease: "power3.out" }));
      card.addEventListener("mouseleave", () => gsap.to(media, { scale: 1, duration: 0.7, ease: "power3.out" }));
    });

    gsap.to(q(".marquee-track"), { xPercent: -35, ease: "none", scrollTrigger: { trigger: q(".marquee"), start: "top bottom", end: "bottom top", scrub: 1 } });

    gsap.to(q(".final-dragon"), {
      yPercent: -18,
      rotate: -4,
      scrollTrigger: { trigger: q(".final"), start: "top bottom", end: "bottom top", scrub: 1.3 },
    });

    const cursor = q(".cursor")[0];
    const cursorDot = q(".cursor-dot")[0];
    if (cursor && cursorDot && window.matchMedia("(pointer:fine)").matches) {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
      const xd = gsap.quickTo(cursorDot, "x", { duration: 0.08 });
      const yd = gsap.quickTo(cursorDot, "y", { duration: 0.08 });
      const move = (e: MouseEvent) => { xTo(e.clientX); yTo(e.clientY); xd(e.clientX); yd(e.clientY); };
      window.addEventListener("mousemove", move);
      q("a, button, .experience-card").forEach((el) => {
        el.addEventListener("mouseenter", () => gsap.to(cursor, { scale: 2.4, opacity: 0.9, duration: 0.3 }));
        el.addEventListener("mouseleave", () => gsap.to(cursor, { scale: 1, opacity: 0.6, duration: 0.3 }));
      });
      return () => window.removeEventListener("mousemove", move);
    }
  }, { scope: root });

  const jump = (id: string) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main ref={root} className="site-shell">
      <div className="cursor" aria-hidden="true"><span /></div>
      <div className="cursor-dot" aria-hidden="true" />

      <div className="loader" aria-hidden="true">
        <div className="loader-top"><span>KPZ · UKM</span><span>2026</span></div>
        <div className="loader-center">
          <div className="loader-glyph">毅</div>
          <div className="loader-name">毅见倾新</div>
          <div className="loader-sub">THE BEGINNING OF US</div>
        </div>
        <div className="loader-bottom"><span>ARRIVE AS STRANGERS</span><span>01 / 10 / 2026</span></div>
        <div className="loader-bar"><i className="loader-line" /></div>
      </div>

      <header className={`nav ${menu ? "is-open" : ""}`}>
        <button className="brand" onClick={() => jump("top")} aria-label="回到首页">
          <span className="brand-mark">毅</span>
          <span><b>毅见倾新</b><small>THE BEGINNING OF US</small></span>
        </button>
        <nav className="nav-links">
          <button onClick={() => jump("story")}>故事</button>
          <button onClick={() => jump("night")}>时间</button>
          <button onClick={() => jump("journey")}>流程</button>
          <button onClick={() => jump("register")}>报名</button>
        </nav>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="打开菜单"><span /><span /></button>
      </header>

      {menu && <div className="mobile-menu">
        {[['story','故事'],['night','时间'],['journey','流程'],['register','报名']].map(([id, label]) => <button key={id} onClick={() => jump(id)}>{label}<span>↗</span></button>)}
      </div>}

      <section id="top" className="hero section-dark">
        <div className="hero-noise" />
        <div className="hero-grid" />
        <div className="hero-poster-wrap">
          <img className="hero-poster" src="/poster.png" alt="毅见倾新活动海报" />
        </div>
        <div className="hero-vignette" />
        <div className="hero-sigil"><span>毅</span></div>
        <div className="hero-orbit"><span>KPZ · 新生迎新会 · UKM · 2026 · </span></div>
        <div className="hero-dragon">龍</div>
        <div className="hero-content">
          <p className="eyebrow hero-meta"><span>01</span> 新生迎新会 <i /> KOLEJ PENDETA ZA&apos;BA</p>
          <h1 className="hero-title" aria-label="毅见倾新 The Beginning of Us">
            <span className="hero-word cn">毅见</span>
            <span className="hero-word cn second">倾新</span>
            <span className="hero-word en">THE BEGINNING <em>OF</em> US</span>
          </h1>
          <div className="hero-bottom hero-meta">
            <p>陌路而来，同心而聚。<br /><b>Arrive as Strangers. Rise as One.</b></p>
            <button className="scroll-cue" onClick={() => jump("story")}><span>SCROLL TO BEGIN</span><i>↓</i></button>
          </div>
        </div>
      </section>

      <section id="story" className="story section-light">
        <div className="section-index">01 / THE IDEA</div>
        <div className="story-ring"><span>STRANGERS · MEET · CONNECT · RISE · </span></div>
        <div className="story-stage">
          <p className="eyebrow reveal">为什么是「我们」</p>
          <div className="story-lines">
            <div className="story-line">来自不同地方</div>
            <div className="story-line serif">因为相遇</div>
            <div className="story-line accent">成为我们。</div>
          </div>
          <p className="story-copy reveal">大学的第一章，不从熟悉开始。<br />它从一个陌生的名字、一场相遇、一次一起大笑开始。</p>
        </div>
        <div className="story-aside reveal"><span>01</span><p>NEW PEOPLE<br />NEW PLACE<br />NEW CHAPTER</p></div>
      </section>

      <section id="night" className="date-section section-dark">
        <div className="section-index">02 / THE NIGHT</div>
        <div className="date-orb" />
        <div className="date-layout">
          <div className="date-label reveal"><span>WHEN</span><i /> 星期四</div>
          <div className="date-display">
            <div className="date-row"><span className="date-number">01</span><span className="date-word">OCT</span></div>
            <div className="date-row"><span className="date-number">2026</span></div>
          </div>
          <div className="date-details reveal">
            <div><small>TIME</small><strong>7:30 — 9:30 PM</strong></div>
            <div><small>PLACE</small><strong>GRAND HALL, KPZ</strong><span>KOLEJ PENDETA ZA&apos;BA · UKM</span></div>
            <div><small>PEOPLE</small><strong>30 新生</strong></div>
          </div>
        </div>
        <div className="date-bottom"><span>01.10.26</span><span>THE BEGINNING OF US</span><span>KPZ / UKM</span></div>
      </section>

      <section id="journey" className="timeline section-light">
        <div className="section-index">03 / THE JOURNEY</div>
        <div className="timeline-head">
          <p className="eyebrow reveal">今晚，我们一起走过</p>
          <h2 className="display reveal">一晚，<br /><span>十一幕。</span></h2>
          <p className="lead reveal">从签到到合照，每一个时间点都只是一个新的相遇。</p>
        </div>
        <div className="timeline-wrap">
          <div className="timeline-rail"><i className="timeline-progress" /></div>
          <div className="timeline-list">
            {schedule.map(([time, cn, en, copy]) => (
              <article className="timeline-item" key={time}>
                <div className="timeline-time">{time}</div>
                <div className="timeline-dot" />
                <div className="timeline-main"><h3>{cn}</h3><span>{en}</span><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="experiences section-dark">
        <div className="section-index">04 / EXPERIENCE</div>
        <div className="experience-head"><p className="eyebrow reveal">不是旁观，是参与。</p><h2 className="display reveal">今晚，<br /><span>一起发生。</span></h2></div>
        <div className="experience-grid">
          {experiences.map((x) => (
            <article className="experience-card" key={x.n}>
              <div className="card-media"><div className="card-glow" /><div className="card-glyph">{x.n}</div></div>
              <div className="card-body"><small>{x.n}</small><h3>{x.cn}</h3><span>{x.en}</span><p>{x.copy}</p><b>EXPLORE ↗</b></div>
            </article>
          ))}
        </div>
      </section>

      <section className="marquee section-red" aria-hidden="true">
        <div className="marquee-track"><span>陌路而来</span><i>✦</i><span>同心而聚</span><i>✦</i><span>RISE AS ONE</span><i>✦</i><span>毅见倾新</span><i>✦</i><span>THE BEGINNING OF US</span></div>
      </section>

      <section id="register" className="register section-light">
        <div className="section-index">05 / JOIN US</div>
        <div className="register-bg"><img src="/poster.png" alt="" /></div>
        <div className="register-overlay" />
        <div className="register-content">
          <p className="eyebrow reveal">准备好了吗？</p>
          <h2 className="register-title reveal">来到这里，<br /><span>成为「我们」。</span></h2>
          <p className="register-copy reveal">报名参加《毅见倾新 · The Beginning of Us》<br />01 / 10 / 2026 · Grand Hall, KPZ</p>
          <a className="register-btn reveal" href="#register-form"><span>立即报名</span><i>↗</i></a>
          <div id="register-form" className="qr-card reveal"><img className="qr-image" src="/qr.png" alt="活动报名二维码" /><div><small>REGISTRATION</small><strong>扫描二维码<br />填写报名表格</strong></div></div>
        </div>
      </section>

      <section className="final section-dark">
        <div className="final-noise" />
        <div className="final-dragon">龍</div>
        <div className="final-content">
          <span className="final-small">01 · 10 · 2026 / GRAND HALL KPZ</span>
          <h2><span>陌路而来。</span><span>同心而聚。</span></h2>
          <div className="final-rule" />
          <p>ARRIVE AS STRANGERS.<br /><b>RISE AS ONE.</b></p>
          <div className="final-mark">毅</div>
          <span className="final-end">THE BEGINNING OF US</span>
        </div>
      </section>

      <footer className="footer">
        <span>毅见倾新 · 2026</span><span>KPZ · UKM</span><span>MADE FOR A NEW BEGINNING</span>
      </footer>
    </main>
  );
}
