import React, { useState } from 'react';
import { X, Mail, Copy, Check, Send, ExternalLink, ArrowRight } from 'lucide-react';
import { Language } from '../types/index.ts';
import { FOUNDER_INFO } from '../data/projectsData.ts';

interface ContactModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, lang, onClose }) => {
  if (!isOpen) return null;

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const emailDraftSubject = lang === 'zh'
    ? `[GZ2AI 咨询] ${formData.subject || '系统合作咨询'} - ${formData.name || '访客'}`
    : `[GZ2AI Inquiry] ${formData.subject || 'Inquiry'} - ${formData.name || 'Visitor'}`;

  const emailDraftBody = lang === 'zh'
    ? `您好 George，

我通过 gz2ai.com 官方网站向您发送联络信息：

【咨询主题】: ${formData.subject}
【访客姓名】: ${formData.name}
【联系邮箱】: ${formData.email}

【留言详情】:
${formData.message}

------------------------------------------------
发送自 George Zhang AI Projects (https://gz2ai.com)`
    : `Hello George,

I am contacting you via gz2ai.com:

Subject: ${formData.subject}
Name: ${formData.name}
Email: ${formData.email}

Message Details:
${formData.message}

------------------------------------------------
Sent from George Zhang AI Projects (https://gz2ai.com)`;

  const mailtoLink = `mailto:${FOUNDER_INFO.email}?subject=${encodeURIComponent(emailDraftSubject)}&body=${encodeURIComponent(emailDraftBody)}`;
  const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(FOUNDER_INFO.email)}&su=${encodeURIComponent(emailDraftSubject)}&body=${encodeURIComponent(emailDraftBody)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(FOUNDER_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyDraft = () => {
    const fullDraft = `收件人: ${FOUNDER_INFO.email}\n主题: ${emailDraftSubject}\n\n${emailDraftBody}`;
    navigator.clipboard.writeText(fullDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorMsg(lang === 'zh' ? '请填写完整姓名、邮箱、主题与留言内容。' : 'Please fill out all required fields.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);

    // Actively trigger mail client
    try {
      window.location.href = mailtoLink;
    } catch {
      // Fallback handled in UI
    }
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
                {lang === 'zh' ? '直达邮箱 info@gz2ai.com' : 'Direct to info@gz2ai.com'}
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

        {/* Email Direct Action Card */}
        <div className="my-4 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-indigo-600 font-mono font-semibold block">
              {lang === 'zh' ? '作者直联信箱:' : 'Direct Recipient:'}
            </span>
            <span className="text-sm font-bold text-slate-900 font-mono">{FOUNDER_INFO.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${FOUNDER_INFO.email}`}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{lang === 'zh' ? '直接写信' : 'Direct Email'}</span>
            </a>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 text-indigo-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-indigo-200 shadow-2xs"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-indigo-600" />}
              <span>{copiedEmail ? (lang === 'zh' ? '已复制' : 'Copied') : (lang === 'zh' ? '复制' : 'Copy')}</span>
            </button>
          </div>
        </div>

        {/* Form or Submitted State */}
        {submitted ? (
          <div className="py-4 space-y-4">
            <div className="text-center space-y-1.5">
              <div className="w-11 h-11 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
                <Check className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                {lang === 'zh' ? '邮件草稿已就绪！' : 'Email Draft Ready!'}
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-normal">
                {lang === 'zh'
                  ? `系统已将您的信息打包为邮件草稿，目标收件箱为 ${FOUNDER_INFO.email}。请选择下方方式完成发送：`
                  : `Your inquiry has been formatted for ${FOUNDER_INFO.email}. Please choose an option below to send:`}
              </p>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href={mailtoLink}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{lang === 'zh' ? '1. 使用本地邮箱客户端发送' : '1. Open Default Mail App'}</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={gmailWebLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-900 text-xs font-semibold border border-slate-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-indigo-600" />
                  <span>{lang === 'zh' ? '2. 使用 Gmail 网页版直接发信' : '2. Open in Gmail Web'}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">mail.google.com ↗</span>
              </a>

              <button
                onClick={handleCopyDraft}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {copiedDraft ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                  <span>{copiedDraft ? (lang === 'zh' ? '已复制完整草稿！' : 'Draft Copied!') : (lang === 'zh' ? '3. 复制完整邮件草稿 (自行粘贴发送)' : '3. Copy Full Email Draft')}</span>
                </div>
                <span className="text-[10px] text-indigo-600 font-semibold">{copiedDraft ? '✓' : 'Copy'}</span>
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <button
                onClick={() => setSubmitted(false)}
                className="text-slate-500 hover:text-slate-900 underline cursor-pointer"
              >
                {lang === 'zh' ? '← 返回修改内容' : '← Edit form'}
              </button>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
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
                  {lang === 'zh' ? '您的联系邮箱' : 'Your Email'}
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
                {lang === 'zh' ? '主题 / 咨询事项' : 'Subject'}
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                placeholder={lang === 'zh' ? '例如: 关于 BESS 系统接入合作' : 'e.g. Partnership inquiry, system integration'}
                className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
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

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] text-slate-500 text-left">
                {lang === 'zh' ? '📨 提交将直达 info@gz2ai.com' : '📨 Sends directly to info@gz2ai.com'}
              </p>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
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
                  <span>{lang === 'zh' ? '发送邮件' : 'Send Email'}</span>
                </button>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
