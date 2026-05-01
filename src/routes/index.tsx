import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
  return (
    <div className="home">
      <h1 className="home-title">Shadow</h1>
      <p className="home-desc">通过 Doctor Who 经典台词练习英语打字</p>
      <Link to="/practice" className="btn-start">
        开始练习 →
      </Link>
    </div>
  );
}
