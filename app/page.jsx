import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        探索 & 分享
        <br className="max:-md:hidden"/> 
        {/* 大螢幕隱藏 */}
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        透過「探索」及「分享」創意且準確的Prompts，<br/>引導 AI 模型幫助不同社群完成特定領域的任務！
      </p>
      <p className="desc text-center">
      An open-source AI prompting tool for modern world <br/>to discover, create and share creative prompts👩🏻‍💻👨🏻‍💻
      </p>
      

      <Feed/>
    </section>
 )
}

export default Home