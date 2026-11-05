import type {Installation,Incident} from './types';
import {activeFor,severityRank} from './types';
import {dummyPocEmail} from './installations';

const clean=(value:string)=>value.replace(/[\r\n]+/g,' ').trim();
const clip=(value:string,n:number)=>{const chars=Array.from(clean(value));return chars.length>n?chars.slice(0,n-1).join('')+'…':chars.join('');};
const compose=(to:string,subject:string,body:string)=>'https://outlook.office.com/mail/deeplink/compose?'+Object.entries({to,subject,body}).map(([k,v])=>`${k}=${encodeURIComponent(v)}`).join('&');

export function outlookDraft(site:Installation,incidents:Incident[]){
 const to=site.contactEmail.trim()||dummyPocEmail(site.id),dummy=to.endsWith('@example.invalid');
 const reports=activeFor(site.id,incidents).sort((a,b)=>severityRank[b.severity]-severityRank[a.severity]||b.updatedAt.localeCompare(a.updatedAt));
 const subject=`${dummy?'[DEMO] ':''}Sentinel | ${clip(site.name,75)} | ${reports.length} active ${reports.length===1?'alert':'alerts'}${reports.length?' | '+reports[0].severity.toUpperCase():''}`;
 const header=[dummy?'DEMO EMAIL — fictional, non-deliverable recipient. Replace before sending.':'Sentinel alert coordination',`Installation: ${clip(site.name,100)}`,`Active reports: ${reports.length}`,reports.length?'Reported activity is unconfirmed; please validate mission impact.':'No active reports are recorded. This does not verify system health.'].join('\r\n');
 const footer='\r\n\r\nPlease confirm impact, response lead, and next update time.\r\nFull reports: https://sentinel-incident-globe.ovalllama.chatgpt.site/\r\n';
 let selected:string[]=[];
 const body=(blocks:string[])=>header+(blocks.length?'\r\n\r\n'+blocks.join('\r\n\r\n'):'')+(reports.length>blocks.length?`\r\n${reports.length-blocks.length} additional active report(s); review Sentinel for full details.`:'')+footer;
 for(const report of reports.slice(0,3)){
  const block=[`${report.severity.toUpperCase()} | ${report.status} | ${clip(report.title,65)}`,`Report: ${report.id}`,`Updated: ${report.updatedAt}`,clip(report.summary,140)].join('\r\n');
  if(compose(to,subject,body([...selected,block])).length>2400)break;
  selected.push(block);
 }
 let text=body(selected);
 return {to,subject,body:text,url:compose(to,subject,text),dummy,includedReports:selected.length};
}
