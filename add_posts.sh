#!/bin/bash

# WordPress credentials
WP_URL="https://wordpress-1097675-6067353.cloudwaysapps.com/wp-json/wp/v2/posts"
AUTH="NADAV:vnv8 spYA yKLu aov0 Wg1A JElr"

echo "Creating 5 blog posts in WordPress..."
echo ""

# Post 1: SEO Guide
echo "1/5 - Creating: מדריך מקיף לקידום אתרים בגוגל 2024"
curl -sk -X POST "$WP_URL" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"title":"מדריך מקיף לקידום אתרים בגוגל 2024","slug":"seo-guide-2024","status":"publish","content":"<h2>מהו קידום אתרים (SEO)?</h2><p>קידום אתרים הוא תהליך אופטימיזציה של אתר האינטרנט שלך כדי להופיע בתוצאות החיפוש הראשונות בגוגל. זהו אחד הכלים החשובים ביותר בשיווק דיגיטלי מודרני.</p><h3>למה SEO חשוב לעסק שלך?</h3><p>93% מכל הפעילות באינטרנט מתחילה במנוע חיפוש. אם האתר שלך לא מופיע בעמוד הראשון, אתה מפסיד לקוחות פוטנציאליים כל יום.</p><h4>יתרונות קידום אורגני:</h4><ul><li>תנועה איכותית וממוקדת</li><li>עלות נמוכה לטווח ארוך</li><li>אמינות גבוהה יותר מפרסום ממומן</li><li>ROI גבוה במיוחד</li></ul><h2>אסטרטגיות SEO מתקדמות</h2><h3>1. מחקר מילות מפתח</h3><p>מחקר מילות מפתח הוא הבסיס לכל קמפיין SEO מוצלח. יש למצוא את המילים שהלקוחות שלך מחפשים.</p><h4>כלים מומלצים למחקר:</h4><ul><li>Google Keyword Planner</li><li>Ahrefs</li><li>SEMrush</li><li>Ubersuggest</li></ul><h3>2. אופטימיזציה On-Page</h3><p>אופטימיזציה פנימית כוללת שיפור תוכן, מטא תגיות, וכותרות בדפי האתר שלך.</p><h2>סיכום</h2><p>קידום אתרים הוא מרתון, לא ספרינט. עם אסטרטגיה נכונה וסבלנות, תוכל להשיג תוצאות מרשימות.</p>"}' | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'   ✅ Created ID: {d.get(\"id\", \"ERROR\")}') if 'id' in d else print(f'   ❌ Error: {d}')"

echo ""

# Post 2: Social Media Marketing
echo "2/5 - Creating: שיווק בסושיאל מדיה: המדריך המלא לעסקים"
curl -sk -X POST "$WP_URL" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"title":"שיווק בסושיאל מדיה: המדריך המלא לעסקים","slug":"social-media-marketing-guide","status":"publish","content":"<h2>למה שיווק בסושיאל מדיה חיוני לעסק שלך?</h2><p>עם למעלה מ-4 מיליארד משתמשים ברשתות החברתיות ברחבי העולם, נוכחות דיגיטלית בפלטפורמות אלו היא כבר לא אופציה - היא הכרח.</p><h3>הפלטפורמות המובילות</h3><h4>פייסבוק ואינסטגרם</h4><p>פייסבוק ואינסטגרם (Meta) מציעים את מערכת הפרסום המתקדמת ביותר עם יכולות טירגוט מדויקות.</p><h4>לינקדאין</h4><p>הפלטפורמה האידיאלית לשיווק B2B ולבניית מותג מקצועי.</p><h4>טיקטוק</h4><p>הפלטפורמה הצומחת ביותר, מושלמת להגעה לקהל צעיר ויצירת תוכן ויראלי.</p><h2>אסטרטגיית תוכן לסושיאל</h2><h3>סוגי תוכן שעובדים</h3><ul><li>וידאו קצר (Reels, TikTok)</li><li>תמונות איכותיות</li><li>Stories אינטראקטיביים</li><li>פוסטים חינוכיים</li></ul><h3>מדידת הצלחה</h3><ul><li>Engagement Rate - שיעור מעורבות</li><li>Reach - חשיפה</li><li>Click-through Rate - שיעור הקלקות</li></ul>"}' | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'   ✅ Created ID: {d.get(\"id\", \"ERROR\")}') if 'id' in d else print(f'   ❌ Error: {d}')"

echo ""

# Post 3: Google Ads
echo "3/5 - Creating: Google Ads: איך להפעיל קמפיין ממומן מצליח"
curl -sk -X POST "$WP_URL" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"title":"Google Ads: איך להפעיל קמפיין ממומן מצליח","slug":"google-ads-campaign-guide","status":"publish","content":"<h2>מבוא ל-Google Ads</h2><p>Google Ads היא פלטפורמת הפרסום הגדולה בעולם. עם Google Ads תוכל להופיע בראש תוצאות החיפוש תוך דקות.</p><h3>סוגי קמפיינים ב-Google Ads</h3><h4>Search Campaigns - קמפייני חיפוש</h4><p>מודעות טקסט שמופיעות בתוצאות החיפוש של גוגל.</p><h4>Display Campaigns - קמפייני תצוגה</h4><p>באנרים גרפיים שמופיעים באתרים ברחבי האינטרנט.</p><h4>Shopping Campaigns - קמפייני שופינג</h4><p>מציגים מוצרים עם תמונה, מחיר ושם החנות. חובה לכל חנות אונליין.</p><h2>הגדרת קמפיין מנצח</h2><h3>שלב 1: הגדרת יעדים</h3><p>לפני שמתחילים, חשוב להגדיר יעדים ברורים: לידים, מכירות, תנועה לאתר או מודעות מותג.</p><h3>שלב 2: מחקר מילות מפתח</h3><p>השתמש ב-Keyword Planner כדי למצוא מילות מפתח רלוונטיות.</p><h4>סוגי התאמה:</h4><ul><li>Broad Match - התאמה רחבה</li><li>Phrase Match - התאמת ביטוי</li><li>Exact Match - התאמה מדויקת</li></ul><h2>מדדים חשובים</h2><ul><li>CTR - Click Through Rate</li><li>CPC - Cost Per Click</li><li>Quality Score - ציון איכות</li><li>ROAS - Return on Ad Spend</li></ul>"}' | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'   ✅ Created ID: {d.get(\"id\", \"ERROR\")}') if 'id' in d else print(f'   ❌ Error: {d}')"

echo ""

# Post 4: Content Marketing
echo "4/5 - Creating: שיווק באמצעות תוכן: Content Marketing שעובד"
curl -sk -X POST "$WP_URL" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"title":"שיווק באמצעות תוכן: Content Marketing שעובד","slug":"content-marketing-strategy","status":"publish","content":"<h2>מהו Content Marketing?</h2><p>שיווק באמצעות תוכן הוא אסטרטגיה ארוכת טווח שמתמקדת ביצירת והפצת תוכן ערכי, רלוונטי ועקבי.</p><h3>למה תוכן הוא המלך?</h3><p>תוכן איכותי בונה אמון, ממצב אותך כמומחה בתחום, ומושך לקוחות פוטנציאליים באופן אורגני.</p><h4>יתרונות Content Marketing:</h4><ul><li>עלות נמוכה יחסית לפרסום ממומן</li><li>תוצאות לטווח ארוך</li><li>בניית סמכות ואמינות</li><li>שיפור SEO</li></ul><h2>סוגי תוכן שעובדים</h2><h3>בלוג</h3><p>כתבות בלוג הן הבסיס לכל אסטרטגיית תוכן. הן משפרות SEO ומספקות ערך לקהל.</p><h3>וידאו</h3><p>וידאו הוא סוג התוכן המעורר ביותר. יוטיוב הוא מנוע החיפוש השני בגודלו בעולם.</p><h3>אינפוגרפיקות</h3><p>מידע ויזואלי קל לעיכול ולשיתוף. מקבלות פי 3 יותר שיתופים.</p><h2>בניית אסטרטגיית תוכן</h2><h3>שלב 1: הגדרת קהל יעד</h3><p>מי הלקוח האידיאלי שלך? מה הבעיות שלו?</p><h3>שלב 2: מחקר נושאים</h3><p>מצא נושאים שמעניינים את הקהל שלך.</p><h3>שלב 3: לוח תוכן</h3><p>תכנן מראש את התוכן שלך. עקביות היא המפתח להצלחה.</p>"}' | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'   ✅ Created ID: {d.get(\"id\", \"ERROR\")}') if 'id' in d else print(f'   ❌ Error: {d}')"

echo ""

# Post 5: CRO
echo "5/5 - Creating: אופטימיזציה של שיעור המרה (CRO)"
curl -sk -X POST "$WP_URL" \
  -u "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{"title":"אופטימיזציה של שיעור המרה (CRO): הפוך מבקרים ללקוחות","slug":"conversion-rate-optimization","status":"publish","content":"<h2>מהו CRO?</h2><p>Conversion Rate Optimization (CRO) הוא תהליך שיטתי להגדלת אחוז המבקרים באתר שמבצעים פעולה רצויה.</p><h3>למה CRO חשוב?</h3><p>הכפלת שיעור ההמרה שווה להכפלת ההכנסות מאותה כמות תנועה.</p><h4>דוגמה מספרית:</h4><ul><li>1,000 מבקרים בחודש</li><li>שיעור המרה 2% = 20 לקוחות</li><li>שיעור המרה 4% = 40 לקוחות</li><li>הכפלת לקוחות ללא עלות נוספת!</li></ul><h2>אלמנטים קריטיים ל-CRO</h2><h3>1. כותרות (Headlines)</h3><p>הכותרת היא הדבר הראשון שמבקרים רואים. כותרת טובה יכולה להגדיל המרות ב-30%.</p><h3>2. קריאה לפעולה (CTA)</h3><p>כפתור ה-CTA הוא האלמנט החשוב ביותר בדף. הוא צריך לבלוט ולהיות ברור.</p><h4>טיפים ל-CTA:</h4><ul><li>צבע בולט ומנוגד</li><li>טקסט ספציפי</li><li>יוצר דחיפות</li></ul><h3>3. הוכחה חברתית</h3><p>עדויות, ביקורות ולוגואים של לקוחות בונים אמון ומגדילים המרות.</p><h2>תהליך CRO</h2><h3>שלב 1: מחקר</h3><p>הבן איפה המבקרים נוטשים. השתמש ב-Google Analytics וב-Hotjar.</p><h3>שלב 2: A/B Testing</h3><p>בדוק גרסה אחת מול השנייה. שנה רק אלמנט אחד בכל פעם.</p><h3>שלב 3: ניתוח ויישום</h3><p>נתח את התוצאות. אם הגרסה החדשה ניצחה - יישם.</p>"}' | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'   ✅ Created ID: {d.get(\"id\", \"ERROR\")}') if 'id' in d else print(f'   ❌ Error: {d}')"

echo ""
echo "========================================"
echo "Done! Checking posts..."
echo "========================================"

curl -sk "https://wordpress-1097675-6067353.cloudwaysapps.com/wp-json/wp/v2/posts?per_page=10" | python3 -c "
import json, sys
posts = json.load(sys.stdin)
print(f'Total posts in WordPress: {len(posts)}')
print('')
for p in posts:
    print(f'• {p[\"title\"][\"rendered\"]}')
    print(f'  /blog/{p[\"slug\"]}')
    print('')
"
