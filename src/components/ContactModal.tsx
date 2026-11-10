import React, { useState } from 'react';
import { X, Mail, Copy, Check, Send, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/index.ts';
import { FOUNDER_INFO } from '../data/projectsData.ts';

interface ContactModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, lang, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: 'med',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOUNDER_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg(lang === 'zh' ? '请填写完整姓名、邮箱与留言内容。' : 'Please fill out all required fields.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/50 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200 text-slate-900"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {lang === 'zh' ? '联系 George Zhang' : 'Contact George Zhang'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'zh' ? '项目咨询、技术合作与系统接入' : 'System collaboration, inquiries & integrations'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Copy Card */}
        <div className="my-5 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-indigo-600 font-mono font-semibold block">Direct Inquiries:</span>
            <span className="text-sm font-bold text-slate-900 font-mono">{FOUNDER_INFO.email}</span>
          </div>
          <button
            onClick={handleCopyEmail}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-indigo-200 shadow-2xs"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-indigo-600" />}
            <span>{copied ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制邮箱' : 'Copy Email')}</span>
          </button>
        </div>

        {/* Form or Submitted State */}
        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">
              {lang === 'zh' ? '消息已记录！' : 'Message Received!'}
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto font-normal">
              {lang === 'zh'
                ? `感谢您的留言，已为您向 ${FOUNDER_INFO.email} 递交联络凭据，George 将会尽快答复。`
                : `Thank you! Your inquiry has been routed to ${FOUNDER_INFO.email}. George will be in touch shortly.`}
            </p>
            <div className="pt-3">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer shadow-sm"
              >
                {lang === 'zh' ? '完成' : 'Done'}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {errorMsg && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'zh' ? '姓名 / 称呼' : 'Your Name'}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder={lang === 'zh' ? '例如: Dr. Smith' : 'e.g. Alex Chen'}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'zh' ? '联系邮箱' : 'Your Email'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {lang === 'zh' ? '关联项目 / 咨询方向' : 'Target System of Interest'}
              </label>
              <select
                value={formData.project}
                onChange={e => setFormData({ ...formData, project: e.target.value })}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-indigo-500 transition-colors"
              >
                <option value="med">Med Project (医学院申请与临床诊断引擎)</option>
                <option value="bess">BESS System (智能电池储能与数据分析)</option>
                <option value="cpms">CPMS Portal (核心业务精细化管理平台)</option>
                <option value="general">{lang === 'zh' ? '通用技术合作 / 软件架构咨询' : 'General Architecture Collaboration'}</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                {lang === 'zh' ? '留言内容' : 'Message Details'}
              </label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder={lang === 'zh' ? '简述您的业务需求或系统对接场景...' : 'Tell us about your use case or integration requirements...'}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {lang === 'zh' ? '取消' : 'Cancel'}
              </button>

              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{lang === 'zh' ? '提交留言' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
