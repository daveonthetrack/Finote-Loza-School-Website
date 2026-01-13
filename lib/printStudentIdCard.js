// Centralized Student ID card print template.
// Used by admin student list + admin student detail.

export function openStudentIdCardPrintWindow(student, options = {}) {
  if (!student) return;

  const opts = {
    schoolName: options.schoolName || 'Finote Loza School',
    // Prefer provided logo URL; otherwise fall back to the bundled app logo.
    logoUrl: options.logoUrl || '/logo.png',
    website: options.website || 'www.finoteloza.edu',
    phone: options.phone || '+251 11 123 4567',
    address: options.address || 'Addis Ababa, Ethiopia',
    academicYear: options.academicYear || null,
    issuedAt: options.issuedAt || new Date(),
    // QR data to encode. If not provided, we encode the student_id.
    // (Uses an external QR image service.)
    qrData: options.qrData || '',
  };

  const s = student;
  const safe = (v) =>
    String(v ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

  const fullName = [s.first_name, s.middle_name, s.last_name].filter(Boolean).join(' ');
  const initials = `${(s.first_name?.[0] || 'S')}${(s.last_name?.[0] || 'T')}`.toUpperCase();
  const gradeSection = s.grade_level && s.homeroom ? `${s.grade_level}${s.homeroom}` : (s.grade_level || s.homeroom || 'N/A');
  const currentYear = new Date().getFullYear();
  const academicYear = opts.academicYear || `${currentYear - 1}-${currentYear}`;
  const issuedStr = new Date(opts.issuedAt).toLocaleDateString();
  const validThrough = `${currentYear}`;

  // Optional QR image
  // QR should encode ONLY the Student ID (per request).
  const qrPayload = opts.qrData || (s.student_id ? String(s.student_id) : '');
  const qrImg = qrPayload
    ? `<img class="qr" alt="QR" src="https://api.qrserver.com/v1/create-qr-code/?size=92x92&data=${encodeURIComponent(
        qrPayload
      )}" />`
    : '';

  const logoHtml = `<img class="logo-img" alt="Logo" src="${safe(opts.logoUrl)}" />`;

  const html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Student ID Card - ${safe(fullName || s.student_id || '')}</title>
      <style>
        @page { size: 3.375in 2.125in; margin: 0; }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          padding: 20px;
          background: #f3f4f6;
          font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .toolbar {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin: 0 0 16px;
        }
        .btn {
          appearance: none;
          border: 1px solid #d1d5db;
          background: #fff;
          padding: 8px 10px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
        }
        .btn.primary { background: #0b1b3f; color: #fff; border-color: #0b1b3f; }
        .pages { display: grid; gap: 16px; justify-content: center; }
        .page { display: grid; gap: 10px; justify-items: center; }

        /* Card */
        .card {
          width: 3.375in;
          height: 2.125in;
          border: 2px solid #0b1b3f;
          border-radius: 10px;
          overflow: hidden;
          background: white;
          position: relative;
          box-shadow: 0 8px 18px rgba(0,0,0,0.12);
        }
        .header {
          background: linear-gradient(135deg, #0b1b3f 0%, #1e3a8a 100%);
          color: #fff;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }
        .logo-circle {
          width: 30px; height: 30px;
          border-radius: 9999px;
          background: #f5cf5d;
          color: #0b1b3f;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900;
          font-size: 12px;
          flex: 0 0 auto;
        }
        .logo-img {
          width: 30px; height: 30px;
          border-radius: 9999px;
          background: #fff;
          object-fit: cover;
          border: 1px solid rgba(255,255,255,0.35);
          flex: 0 0 auto;
        }
        .school {
          font-weight: 800;
          font-size: 10px;
          line-height: 1.1;
          /* Allow wrapping so long school names don't get cut off */
          white-space: normal;
          overflow: hidden;
          max-width: 180px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .tag {
          font-size: 9px;
          letter-spacing: 0.12em;
          opacity: 0.92;
          font-weight: 700;
        }
        .body {
          display: grid;
          grid-template-columns: 86px 1fr;
          gap: 12px;
          padding: 12px;
        }
        .photo {
          width: 86px;
          height: 1.17in;
          border-radius: 8px;
          border: 2px solid #e5e7eb;
          overflow: hidden;
          background: #f9fafb;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .photo img { width: 100%; height: 100%; object-fit: cover; }
        .photo .ph {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #f5cf5d 0%, #e5d4a0 100%);
          color: #0b1b3f;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 26px;
        }
        .name {
          font-size: 12px;
          font-weight: 900;
          color: #0b1b3f;
          line-height: 1.12;
          margin-bottom: 6px;
          /* Allow 2 lines then ellipsis */
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .meta {
          display: grid;
          gap: 5px;
        }
        .label {
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #6b7280;
          margin-bottom: 1px;
          font-weight: 700;
        }
        .value {
          font-size: 10px;
          color: #111827;
          font-weight: 700;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        .sid {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
          letter-spacing: 0.08em;
          color: #1e3a8a;
          font-weight: 900;
          font-size: 11px;
        }
        .bar {
          height: 18px;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          background:
            repeating-linear-gradient(90deg, #111827 0 1px, transparent 1px 3px);
          opacity: 0.9;
          margin-top: 6px;
        }
        .tight-row {
          display: flex;
          gap: 8px;
        }
        .tight-row > div {
          flex: 1;
          min-width: 0;
        }
        .footer {
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
          padding: 7px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 8px;
          color: #6b7280;
        }

        /* Back side */
        .back {
          /* Let the middle section naturally take remaining space between header/footer */
          flex: 1;
          min-height: 0;
          padding: 10px 12px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          align-items: stretch;
        }
        .if-found {
          border: 1px dashed #cbd5e1;
          border-radius: 8px;
          padding: 8px;
          font-size: 9px;
          line-height: 1.25;
          color: #0b1b3f;
          background: #ffffff;
          overflow: hidden;
          word-break: break-word;
          overflow-wrap: anywhere;
        }
        /* Allow address + contact to wrap cleanly without pushing content out */
        .if-found .addr {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
        }
        .if-found strong { font-size: 9px; }
        .small {
          font-size: 8px;
          color: #6b7280;
          margin-top: 6px;
          line-height: 1.25;
          overflow-wrap: anywhere;
        }
        .sig {
          margin-top: 8px;
          padding-top: 8px;
          border-top: 1px solid #e5e7eb;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .sig .line {
          flex: 1;
          border-bottom: 1px solid #9ca3af;
          height: 14px;
        }
        .sig .cap { font-size: 8px; color: #6b7280; margin-top: 2px; }
        .qr {
          width: 92px;
          height: 92px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: #fff;
        }
        .back-right {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-end;
          justify-content: space-between;
          min-width: 0;
        }
        .back-meta {
          font-size: 8px;
          color: #6b7280;
          text-align: right;
          line-height: 1.25;
          overflow-wrap: anywhere;
          max-width: 92px;
        }
        .clamp-3 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }

        /* Print: hide toolbar and force 2 pages (front + back) */
        @media print {
          body { background: #fff; padding: 0; }
          .toolbar { display: none; }
          .pages { gap: 0; }
          .page { page-break-after: always; }
          .page:last-child { page-break-after: auto; }
          .card { box-shadow: none; border-radius: 0; }
        }
      </style>
    </head>
    <body>
      <div class="toolbar">
        <button class="btn primary" onclick="printBoth()">Print Front + Back</button>
        <button class="btn" onclick="printFront()">Print Front Only</button>
        <button class="btn" onclick="printBack()">Print Back Only</button>
      </div>

      <div class="pages">
        <!-- FRONT -->
        <div class="page" id="frontPage">
          <div class="card">
            <div class="header">
              <div class="brand">
                ${logoHtml}
                <div class="school">${safe(opts.schoolName)}</div>
              </div>
              <div class="tag">STUDENT ID</div>
            </div>
            <div class="body">
              <div class="photo">
                ${
                  s.photo_url
                    ? `<img src="${safe(s.photo_url)}" alt="${safe(fullName)}" onerror="this.remove(); document.getElementById('ph').style.display='flex';" />`
                    : ''
                }
                <div class="ph" id="ph" style="display:${s.photo_url ? 'none' : 'flex'}">${safe(initials)}</div>
              </div>
              <div>
                <div class="name" id="studentName">${safe(fullName || 'Student')}</div>
                <div class="meta">
                  <div>
                    <div class="label">Student ID</div>
                    <div class="value sid">${safe(s.student_id || 'N/A')}</div>
                  </div>
                  <div>
                    <div class="label">Grade & Section</div>
                    <div class="value">${safe(gradeSection)}</div>
                  </div>
                  <div class="tight-row">
                    <div>
                      <div class="label">Academic Year</div>
                      <div class="value">${safe(academicYear)}</div>
                    </div>
                    <div>
                      <div class="label">Issued</div>
                      <div class="value">${safe(issuedStr)}</div>
                    </div>
                  </div>
                </div>
                <div class="bar" title="${safe(s.student_id || '')}"></div>
              </div>
            </div>
            <div class="footer">
              <div>${safe(opts.website)}</div>
              <div>Valid ${safe(validThrough)}</div>
            </div>
          </div>
        </div>

        <!-- BACK -->
        <div class="page" id="backPage">
          <div class="card">
            <div class="header">
              <div class="brand">
                ${logoHtml}
                <div class="school">${safe(opts.schoolName)}</div>
              </div>
              <div class="tag">INFORMATION</div>
            </div>
            <div class="back">
              <div class="if-found">
                <strong>IF FOUND, PLEASE RETURN TO:</strong><br/>
                <span class="addr">${safe(opts.schoolName)}<br/>${safe(opts.address)}</span><br/>
                <span class="small clamp-3">Phone: ${safe(opts.phone)} • Web: ${safe(opts.website)}</span>
                <div class="sig">
                  <div style="flex:1;">
                    <div class="line"></div>
                    <div class="cap">Student Signature</div>
                  </div>
                  <div style="flex:1;">
                    <div class="line"></div>
                    <div class="cap">Registrar</div>
                  </div>
                </div>
                <div class="small clamp-3">This card is the property of ${safe(opts.schoolName)}. Misuse may result in disciplinary action.</div>
              </div>
              <div class="back-right">
                ${qrImg || '<div style="width:92px;height:92px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb;display:flex;align-items:center;justify-content:center;color:#9ca3af;font-size:8px;text-align:center;padding:8px;">QR unavailable</div>'}
                <div class="back-meta">
                  <div><strong>ID:</strong> ${safe(s.student_id || 'N/A')}</div>
                  <div><strong>Grade:</strong> ${safe(gradeSection)}</div>
                </div>
              </div>
            </div>
            <div class="footer">
              <div>Scan for Student ID</div>
              <div>${safe(currentYear)}</div>
            </div>
          </div>
        </div>
      </div>

      <script>
        // Reduce the student name font size if it overflows its 2-line clamp.
        (function autoFitName() {
          var el = document.getElementById('studentName');
          if (!el) return;
          // Try shrinking a bit until it fits (max 6 steps).
          for (var i = 0; i < 6; i++) {
            // If content overflows (scrollHeight bigger than clientHeight), shrink.
            if (el.scrollHeight > el.clientHeight + 1) {
              var size = parseFloat(window.getComputedStyle(el).fontSize || '12');
              if (size <= 9) break;
              el.style.fontSize = (size - 0.5) + 'px';
            } else {
              break;
            }
          }
        })();

        function show(el, on) { if (!el) return; el.style.display = on ? '' : 'none'; }
        function printFront() { show(document.getElementById('frontPage'), true); show(document.getElementById('backPage'), false); window.print(); }
        function printBack() { show(document.getElementById('frontPage'), false); show(document.getElementById('backPage'), true); window.print(); }
        function printBoth() { show(document.getElementById('frontPage'), true); show(document.getElementById('backPage'), true); window.print(); }
        window.onload = function() { setTimeout(printBoth, 200); };
      </script>
    </body>
  </html>`;

  const w = window.open('', '_blank');
  if (!w) return;
  w.document.open();
  w.document.write(html);
  w.document.close();
}


