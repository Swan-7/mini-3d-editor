/**
* Simple accessible modal. Controlled by `open` prop.
* children receives the modal content.
*/
export default function Modal({ open, title, onClose, children }){
    if(!open) return null

    return (
        <div style={{position:'fixed', inset:0, zIndex:200, display:'flex', alignItems:'center', justifyContent:'center'}}>
            <div style={{position:'absolute', inset:0, background:'rgba(2,6,12,0.6)'}} onClick={onClose} />
            <div className="panel" style={{position:'relative', zIndex:210, width:'min(720px,95vw)'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
                    <h3 style={{margin:0}}>{title}</h3>
                    <button className="btn" onClick={onClose}>Close</button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}