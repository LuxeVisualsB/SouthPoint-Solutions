(function(){
var menu=document.getElementById('menu'),burger=document.getElementById('burger');
burger.addEventListener('click',function(){var o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)});

var f=document.getElementById('cf'),ok=document.getElementById('ok');
if(!f)return;
function check(el){
  var v=el.value.trim(),msg='';
  if(!v)msg='This field is required.';
  else if(el.type==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))msg='Please enter a valid email address.';
  else if(el.id==='msg'&&v.length<10)msg='Please add a little more detail.';
  el.setAttribute('aria-invalid',msg?'true':'false');
  el.parentNode.querySelector('.err').textContent=msg;
  return !msg;
}
f.querySelectorAll('input,select,textarea').forEach(function(el){el.addEventListener('blur',function(){check(el)})});
f.addEventListener('submit',function(e){
  e.preventDefault();
  var good=true,first=null;
  f.querySelectorAll('input,select,textarea').forEach(function(el){if(!check(el)){good=false;first=first||el}});
  if(!good){first.focus();return}
  var d=new FormData(f),body='';
  d.forEach(function(v,k){body+=k+': '+v+'\n'});
  var a=document.createElement('a');
  a.href='mailto:hello@southpoint.example?subject='+encodeURIComponent('Consultation enquiry from '+d.get('company'))+'&body='+encodeURIComponent(body);
  document.body.appendChild(a);a.click();a.remove();
  f.style.display='none';ok.style.display='block';ok.focus();
});
})();
