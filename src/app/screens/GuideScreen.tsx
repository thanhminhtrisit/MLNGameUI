import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Target, Gauge, Map, FileText, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';

export function GuideScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Quay lại
        </Button>

        <div className="bg-card border border-border rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-6 text-center">Hướng dẫn Chơi</h1>

          <div className="space-y-6">
            {/* Objective */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <Target className="text-[#22d3ee]" size={24} />
                <h2 className="text-2xl font-semibold">Mục tiêu Game</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Bạn là nhà hoạch định chính sách kinh tế của Việt Nam. Nhiệm vụ là dẫn dắt đất nước qua 15 vòng 
                (tương ứng 15 giai đoạn phát triển đến năm 2045), cân bằng giữa phát triển công nghệ, năng suất 
                với bảo đảm bình đẳng xã hội và thu hẹp khoảng cách công nghệ.
              </p>
            </section>

            {/* Core Stats */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <Gauge className="text-[#10b981]" size={24} />
                <h2 className="text-2xl font-semibold">5 Chỉ số Cốt lõi</h2>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h3 className="font-semibold text-[#06b6d4] mb-1">T - Công nghệ (Technology)</h3>
                  <p className="text-sm text-muted-foreground">
                    Mức độ hiện đại hóa công nghệ của nền kinh tế. Càng cao càng tốt.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h3 className="font-semibold text-[#10b981] mb-1">P - Năng suất (Productivity)</h3>
                  <p className="text-sm text-muted-foreground">
                    Hiệu quả sản xuất. Tăng năng suất là mục tiêu then chốt.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h3 className="font-semibold text-[#f59e0b] mb-1">E - Bình đẳng (Equality)</h3>
                  <p className="text-sm text-muted-foreground">
                    Công bằng xã hội và phân phối. Quá thấp sẽ gây mất ổn định.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h3 className="font-semibold text-[#f97316] mb-1">I - Đổi mới (Innovation)</h3>
                  <p className="text-sm text-muted-foreground">
                    Năng lực sáng tạo và đổi mới công nghệ nội sinh.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h3 className="font-semibold text-red-500 mb-1">Gap - Khoảng cách Công nghệ</h3>
                  <p className="text-sm text-muted-foreground">
                    Chênh lệch công nghệ giữa đô thị và nông thôn. Càng thấp càng tốt. Trên 50 rất nguy hiểm!
                  </p>
                </div>
              </div>
            </section>

            {/* Stability Formula */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="text-[#22d3ee]" size={24} />
                <h2 className="text-2xl font-semibold">Công thức Ổn định</h2>
              </div>
              <div className="p-4 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/30">
                <p className="text-center text-xl font-mono mb-2">S = E × 0.7 - Gap × 0.3</p>
                <p className="text-sm text-muted-foreground">
                  Điểm ổn định (S) phụ thuộc vào Bình đẳng và Khoảng cách. 
                  Nếu S &lt; 0, hệ thống có nguy cơ sụp đổ!
                </p>
              </div>
            </section>

            {/* Gameplay */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <Map className="text-[#f97316]" size={24} />
                <h2 className="text-2xl font-semibold">Cách chơi</h2>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Mỗi vòng, bạn có Ngân sách và Lao động để áp dụng các chính sách</li>
                <li>Chọn chính sách từ tab "Chính sách" - mỗi chính sách có chi phí và tác động khác nhau</li>
                <li>Theo dõi bản đồ Việt Nam để xem khoảng cách công nghệ giữa các vùng</li>
                <li>Xử lý sự kiện ngẫu nhiên và cố định - mỗi lựa chọn có hậu quả riêng</li>
                <li>Nhấn "Kết thúc vòng" để chuyển sang vòng tiếp theo</li>
                <li>Game kết thúc sau vòng 15 hoặc khi hệ thống sụp đổ (S &lt; -30)</li>
              </ol>
            </section>

            {/* Endings */}
            <section>
              <div className="flex items-center gap-3 mb-3">
                <FileText className="text-[#dc2626]" size={24} />
                <h2 className="text-2xl font-semibold">4 Kết cục Có thể</h2>
              </div>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-[#10b981]/10 border border-[#10b981]/30">
                  <span className="font-semibold">🎉 CNH-HĐH Thành công:</span> Cân bằng hoàn hảo LLSX và QHSX
                </div>
                <div className="p-3 rounded-lg bg-[#f97316]/10 border border-[#f97316]/30">
                  <span className="font-semibold">⚠️ Phát triển không đồng đều:</span> Gap quá lớn, mâu thuẫn giai cấp
                </div>
                <div className="p-3 rounded-lg bg-[#dc2626]/10 border border-[#dc2626]/30">
                  <span className="font-semibold">📉 Bẫy lệ thuộc ngoại lực:</span> Thiếu tự chủ công nghệ
                </div>
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <span className="font-semibold">🚨 Sụp đổ hệ thống:</span> Mất ổn định hoàn toàn
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => navigate('/game')}
              size="lg"
              className="bg-gradient-to-r from-[#06b6d4] to-[#22d3ee]"
            >
              Bắt đầu Chơi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
