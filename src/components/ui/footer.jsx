import { Facebook, Twitter, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0f172a] border-t border-slate-200 dark:border-white/5 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* ১. লোগো এবং পরিচিতি */}
          <div className="space-y-5">
            <Link href="/" className="text-2xl font-black text-primary tracking-tighter">
              Micro<span className="text-secondary">Task</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              The world's leading micro-task platform. We connect businesses with a global workforce to complete small tasks quickly and efficiently.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:text-primary dark:hover:text-primary transition-all"><Facebook size={18}/></Link>
              <Link href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:text-primary dark:hover:text-primary transition-all"><Twitter size={18}/></Link>
              <Link href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:text-primary dark:hover:text-primary transition-all"><Linkedin size={18}/></Link>
              <Link href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:text-primary dark:hover:text-primary transition-all"><Github size={18}/></Link>
            </div>
          </div>

          {/* ২. লিঙ্ক সেকশন (For Workers) */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-6">For Workers</h3>
            <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/tasks" className="hover:text-primary dark:hover:text-white transition-colors">Browse Tasks</Link></li>
              <li><Link href="/leaderboard" className="hover:text-primary dark:hover:text-white transition-colors">Top Earners</Link></li>
              <li><Link href="/how-it-works" className="hover:text-primary dark:hover:text-white transition-colors">How to Earn</Link></li>
              <li><Link href="/withdraw" className="hover:text-primary dark:hover:text-white transition-colors">Withdraw Funds</Link></li>
            </ul>
          </div>

          {/* ৩. লিঙ্ক সেকশন (For Buyers) */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-6">For Buyers</h3>
            <ul className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/post-task" className="hover:text-primary dark:hover:text-white transition-colors">Post a Task</Link></li>
              <li><Link href="/pricing" className="hover:text-primary dark:hover:text-white transition-colors">Pricing Plans</Link></li>
              <li><Link href="/buy-coins" className="hover:text-primary dark:hover:text-white transition-colors">Buy Coins</Link></li>
              <li><Link href="/advertise" className="hover:text-primary dark:hover:text-white transition-colors">Advertise</Link></li>
            </ul>
          </div>

          {/* ৪. যোগাযোগ */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-6">Support</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <Mail size={16}/>
                </div>
                <span>support@microtask.com</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <MapPin size={16}/>
                </div>
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

        </div>

        {/* নিচের অংশ - কপিরাইট */}
        <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-500 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} MicroTask Platform. Built with ❤️</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;