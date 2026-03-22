import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, BookOpen, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';

export function TheoryScreen() {
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
          <h1 className="text-4xl font-bold mb-6 text-center">Lý luận Mác-Lênin</h1>
          <p className="text-center text-muted-foreground mb-8">
            Nền tảng Kinh tế Chính trị của game
          </p>

          <div className="space-y-8">
            {/* LLSX & QHSX */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-[#06b6d4]" size={28} />
                <h2 className="text-2xl font-semibold">LLSX và QHSX</h2>
              </div>
              <div className="space-y-4">
                <div className="p-5 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/30">
                  <h3 className="font-semibold text-[#06b6d4] mb-2">Lực lượng Sản xuất (LLSX)</h3>
                  <p className="text-sm leading-relaxed">
                    Bao gồm: Tư liệu sản xuất (công cụ, máy móc, công nghệ) và sức lao động (con người với kỹ năng). 
                    Trong game thể hiện qua <strong>Công nghệ (T)</strong>, <strong>Năng suất (P)</strong> và <strong>Đổi mới (I)</strong>.
                  </p>
                </div>

                <div className="p-5 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30">
                  <h3 className="font-semibold text-[#f59e0b] mb-2">Quan hệ Sản xuất (QHSX)</h3>
                  <p className="text-sm leading-relaxed">
                    Quan hệ giữa người với người trong quá trình sản xuất: quan hệ sở hữu, phân phối, trao đổi. 
                    Trong game thể hiện qua <strong>Bình đẳng (E)</strong> và <strong>Khoảng cách Công nghệ (Gap)</strong>.
                  </p>
                </div>
              </div>
            </section>

            {/* Dialectical Relationship */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-[#10b981]" size={28} />
                <h2 className="text-2xl font-semibold">Mối quan hệ Biện chứng</h2>
              </div>
              <div className="p-5 rounded-lg bg-background border-2 border-[#10b981]">
                <ul className="space-y-3 text-sm">
                  <li className="flex gap-3">
                    <span className="text-[#10b981] font-bold">1.</span>
                    <span>
                      <strong>LLSX quyết định QHSX:</strong> Công nghệ phát triển sẽ làm thay đổi cách tổ chức sản xuất 
                      và quan hệ lao động. VD: Tự động hóa làm giảm nhu cầu lao động giản đơn.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#10b981] font-bold">2.</span>
                    <span>
                      <strong>QHSX phản tác dụng lại LLSX:</strong> Nếu QHSX (chính sách phân phối, quyền sở hữu) 
                      không phù hợp, sẽ kìm hãm LLSX. VD: Bất bình đẳng quá lớn gây bất ổn, cản trở đầu tư.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-[#10b981] font-bold">3.</span>
                    <span>
                      <strong>Mâu thuẫn là động lực:</strong> Khi LLSX phát triển nhanh mà QHSX chậm điều chỉnh, 
                      mâu thuẫn nảy sinh → cần cách mạng hoặc cải cách để giải quyết.
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Game Application */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-[#f97316]" size={28} />
                <h2 className="text-2xl font-semibold">Áp dụng trong Game</h2>
              </div>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <h4 className="font-semibold mb-2">Tình huống 1: Chỉ tăng T, I (LLSX) mà bỏ qua E (QHSX)</h4>
                  <p className="text-sm text-muted-foreground">
                    → Gap tăng cao → Mâu thuẫn giai cấp → Bất ổn → Kết cục "Phát triển không đồng đều"
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background border border-border">
                  <h4 className="font-semibold mb-2">Tình huống 2: Chỉ tăng E (QHSX) mà không phát triển T, P (LLSX)</h4>
                  <p className="text-sm text-muted-foreground">
                    → Kinh tế trì trệ → Thiếu nguồn lực để duy trì phúc lợi → Nghèo đói bình đẳng
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-background border border-border">
                  <h4 className="font-semibold mb-2">Tình huống 3: Cân bằng cả LLSX và QHSX</h4>
                  <p className="text-sm text-muted-foreground">
                    → Phát triển bền vững → Kết cục "CNH-HĐH Thành công"
                  </p>
                </div>
              </div>
            </section>

            {/* Digital Disruption */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-[#dc2626]" size={28} />
                <h2 className="text-2xl font-semibold">Digital Disruption (Đứt gãy Số)</h2>
              </div>
              <div className="p-5 rounded-lg bg-[#dc2626]/10 border border-[#dc2626]/30">
                <p className="text-sm leading-relaxed mb-3">
                  Trong thời đại số, công nghệ phát triển cực nhanh (LLSX tăng vọt) nhưng nếu QHSX không điều chỉnh kịp, 
                  sẽ xảy ra "đứt gãy" (disruption):
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Một nhóm nhỏ (đô thị, nhóm có công nghệ) phát triển rất nhanh</li>
                  <li>Nhóm lớn (nông thôn, lao động giản đơn) bị bỏ lại phía sau</li>
                  <li>Khoảng cách công nghệ (Gap) tăng cao → Mâu thuẫn xã hội bùng nổ</li>
                  <li>Nếu không can thiệp kịp thời → Hệ thống sụp đổ</li>
                </ul>
              </div>
            </section>

            {/* Key Takeaway */}
            <section className="border-t-2 border-[#22d3ee] pt-6">
              <div className="bg-gradient-to-r from-[#06b6d4]/20 to-[#dc2626]/20 rounded-xl p-6 text-center">
                <h3 className="text-xl font-bold mb-3">Bài học Quan trọng</h3>
                <p className="text-lg leading-relaxed italic">
                  "Phát triển công nghệ (LLSX) là cần thiết, nhưng phải đi kèm với chính sách công bằng xã hội (QHSX). 
                  Không thể chỉ chạy theo GDP mà bỏ qua phân phối và bình đẳng."
                </p>
              </div>
            </section>
          </div>

          <div className="mt-8 text-center">
            <Button
              onClick={() => navigate('/game')}
              size="lg"
              className="bg-gradient-to-r from-[#06b6d4] to-[#22d3ee]"
            >
              Áp dụng Lý luận vào Thực hành
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
